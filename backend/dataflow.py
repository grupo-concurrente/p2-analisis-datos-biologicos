import os
import pandas as pd
import psycopg2
from concurrent.futures import ThreadPoolExecutor, as_completed

# Conexión a la base de datos PostgreSQL
def connect_db():
    try:
        conn = psycopg2.connect(
            dbname="bio_data",
            user="tu_usuario",
            password="tu_contraseña",
            host="localhost",
            port="5432"
        )
        return conn
    except Exception as e:
        print(f"Error conectando a la base de datos: {e}")
        return None

# Función para insertar datos en la base de datos
def insert_data(conn, data_type, data_value, timestamp=None):
    try:
        cursor = conn.cursor()
        query = "INSERT INTO data_flows (data_type, data_value, timestamp) VALUES (%s, %s, %s)"
        cursor.execute(query, (data_type, data_value, timestamp))
        conn.commit()
        cursor.close()
    except Exception as e:
        print(f"Error insertando datos: {e}")

# Función para limpiar datos
def clean_data(df):
    # Eliminar filas con valores nulos en 'data_value' o 'timestamp'
    df.dropna(subset=['data_value', 'timestamp'], inplace=True)

    # Eliminar duplicados
    df.drop_duplicates(inplace=True)

    # Convertir la columna 'timestamp' a formato de fecha si es necesario
    if 'timestamp' in df.columns:
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
        df.dropna(subset=['timestamp'], inplace=True)  # Eliminar filas con fechas inválidas

    # Normalizar la columna 'data_value' si es necesario
    df['data_value'] = df['data_value'].apply(lambda x: str(x).strip())  # Limpiar espacios
    return df

# Función para leer archivos CSV, limpiarlos y enviarlos a la base de datos
def process_csv(file_path, conn, data_type):
    try:
        # Leer archivo CSV
        df = pd.read_csv(file_path)
        print(f"Datos cargados desde {file_path}")

        # Limpiar los datos
        df = clean_data(df)
        print(f"Datos limpiados de {file_path}")

        # Asumimos que los CSV tienen columnas "data_value" y "timestamp"
        for _, row in df.iterrows():
            data_value = row['data_value']
            timestamp = row.get('timestamp', None)  # Si no hay columna timestamp, se usa None
            print(f"Insertando en DB: {data_type}, {data_value}, {timestamp}")
            insert_data(conn, data_type, data_value, timestamp)

        print(f"Datos de {data_type} insertados correctamente desde {file_path}.")

    except Exception as e:
        print(f"Error procesando el archivo {file_path}: {e}")

# Función para gestionar el procesamiento de un archivo con la base de datos
def run_process(file_path, data_type):
    conn = connect_db()
    if conn is not None:
        process_csv(file_path, conn, data_type)
        conn.close()
    else:
        print(f"No se pudo establecer conexión para el archivo {file_path}")

# Función principal que utiliza ThreadPoolExecutor
def main():
    # Obtener la ruta base de la carpeta 'Data'
    base_path = os.path.join(os.getcwd(), 'Data')

    # Archivos CSV que se procesarán
    csv_files = [
        (os.path.join(base_path, "Evolution_DataSets.csv"), "Genético"),
        (os.path.join(base_path, "Homininos_DataSet.csv"), "Bioquímico"),
        (os.path.join(base_path, "Homininos_DataSet (1).csv"), "Físico")
    ]

    # Crear un pool de hilos con ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = [executor.submit(run_process, file_path, data_type) for file_path, data_type in csv_files]

        # Esperar a que todas las tareas terminen
        for future in as_completed(futures):
            future.result()  # Esto manejará cualquier excepción levantada durante la ejecución de las tareas

    print("Todos los archivos han sido procesados.")

if __name__ == "__main__":
    main()
