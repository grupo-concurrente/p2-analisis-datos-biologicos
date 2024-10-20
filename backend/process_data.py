import pandas as pd
import numpy as np
from concurrent.futures import ThreadPoolExecutor
import sys
import time
import threading
import random
import json  # Para guardar las equivalencias

# Lock para sincronización entre hilos
progress_lock = threading.Lock()
completed_chunks = 0  # Variable global para llevar el progreso
progress_file = './data/progress.json'  # Archivo para guardar el progreso

# Diccionario de mapeo para renombrar las columnas
column_mapping = {
    'Genus_&_Specie': 'genus_species',
    'Time': 'time_period',
    'Location': 'location',
    'Zone': 'zone',
    'Current_Country': 'current_country',
    'Habitat': 'habitat',
    'Cranial_Capacity': 'cranial_capacity',
    'Height': 'height',
    'Incisor_Size': 'incisor_size',
    'Jaw_Shape': 'jaw_shape',
    'Torus_Supraorbital': 'torus_supraorbital',
    'Prognathism': 'prognathism',
    'Foramen_Mágnum_Position': 'foramen_magnum_position',
    'Canine Size': 'canine_size',
    'Canines_Shape': 'canines_shape',
    'Tooth_Enamel': 'tooth_enamel',
    'Tecno': 'tecno_culture',
    'Tecno_type': 'tecno_type',
    'biped': 'bipedalism',
    'Arms': 'arms_length',
    'Foots': 'feet_structure',
    'Diet': 'diet_type',
    'Sexual_Dimorphism': 'sexual_dimorphism',
    'Hip': 'hip_structure',
    'Vertical_Front': 'vertical_front_structure',
    'Anatomy': 'anatomy_features',
    'Migrated': 'migrated',
    'Skeleton': 'skeleton_features'
}

# Diccionario para almacenar las equivalencias (ahora como arrays)
label_encodings = {}

# Función para limpiar los valores categóricos (elimina saltos de línea y espacios)
def clean_category(value):
    return value.strip()  # Elimina espacios en blanco al inicio/final y saltos de línea

# Inicializar archivo de progreso
def init_progress(num_chunks):
    progress_data = {f"chunk_{i+1}": 0 for i in range(num_chunks)}
    with open(progress_file, 'w') as f:
        json.dump(progress_data, f)

# Función para manejar el progreso de manera segura
def update_progress(chunk_number, progress, total_columns):
    with progress_lock:
        # Leer y actualizar el archivo de progreso
        with open(progress_file, 'r') as f:
            progress_data = json.load(f)

        # Calcular el porcentaje del progreso de la columna
        column_progress = int((progress / total_columns) * 100)

        # Actualizar el progreso para este chunk
        progress_data[f"chunk_{chunk_number + 1}"] = column_progress

        # Guardar el nuevo progreso en el archivo
        with open(progress_file, 'w') as f:
            json.dump(progress_data, f)

        print(f"Progreso (Chunk {chunk_number + 1}): {column_progress}%")

# Función para normalizar y etiquetar columnas categóricas
def normalize_data(chunk, chunk_number):
    chunk = chunk.dropna()
    total_columns = len(chunk.select_dtypes(include=['object']).columns)
    processed_columns = 0

    # Normalización de datos categóricos
    for col in chunk.select_dtypes(include=['object']).columns:
        # Aplicar la función de limpieza a los valores categóricos
        chunk[col] = chunk[col].apply(clean_category)

        chunk[col] = chunk[col].astype('category')

        # Guardar las equivalencias como listas de categorías en lugar de diccionarios
        label_encodings[col] = list(chunk[col].cat.categories)

        # Convertir a códigos numéricos
        chunk[col] = chunk[col].cat.codes

        # Simulación del tiempo de procesamiento proporcional al tamaño del chunk
        processing_time = len(chunk) * 0.001

        # Añadir variación aleatoria del 50% al tiempo de procesamiento
        variation = processing_time * 0.5
        random_adjustment = random.uniform(-variation, variation)
        adjusted_processing_time = processing_time + random_adjustment

        # Hacer el sleep con el tiempo ajustado
        time.sleep(adjusted_processing_time)

        # Actualizar el progreso por cada columna procesada
        processed_columns += 1
        update_progress(chunk_number, processed_columns, total_columns)  # El número de chunk se pasa desde `process_chunk`

    return chunk

# Función principal que se ejecuta por cada fragmento del dataset
def process_chunk(chunk, step, total_steps):
    print(f"Procesando chunk {step + 1} de {total_steps}...")

    # Segunda ronda: normalización
    chunk = normalize_data(chunk, step)

    return chunk

# Función principal del script
def main(num_threads):
    # Cargar dataset
    data = pd.read_csv('./data/dataset.csv')

    # Renombrar columnas según el diccionario column_mapping
    data = data.rename(columns=column_mapping)

    # Dividir el dataset en fragmentos según el número de hilos
    num_chunks = num_threads
    chunks = np.array_split(data, num_chunks)

    # Inicializar el archivo de progreso
    init_progress(num_chunks)

    # Procesar los chunks en paralelo usando ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=num_threads) as executor:
        results = list(executor.map(process_chunk, chunks, range(num_chunks), [num_chunks] * num_chunks))

    # Unir los resultados en un solo dataframe
    final_data = pd.concat(results)

    # Guardar los datos procesados
    final_data.to_csv('./data/processed_data.csv', index=False)

    # Guardar las equivalencias en un archivo JSON
    with open('./data/label_encodings.json', 'w') as f:
        json.dump(label_encodings, f)

    print("Procesamiento completado y datos guardados en 'processed_data.csv'.")
    print("Equivalencias guardadas en 'label_encodings.json'.")

if __name__ == "__main__":
    # Obtener el número de hilos de los argumentos de línea de comandos
    if len(sys.argv) != 2:
        print("Uso: python script.py <num_hilos>")
        sys.exit(1)

    num_threads = int(sys.argv[1])
    main(num_threads)
