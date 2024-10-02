import pandas as pd
import numpy as np
from concurrent.futures import ThreadPoolExecutor
import sys
import time
import threading
import random

# Lock para sincronización entre hilos
progress_lock = threading.Lock()
completed_chunks = 0  # Variable global para llevar el progreso

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

# Función para normalizar y etiquetar columnas categóricas
def normalize_data(chunk):
    chunk = chunk.dropna()

    # Normalización de datos categóricos
    for col in chunk.select_dtypes(include=['object']).columns:
        chunk[col] = chunk[col].astype('category').cat.codes

    # Simulación del tiempo de procesamiento proporcional al tamaño del chunk
    processing_time = len(chunk) * 0.001

    # Añadir variación aleatoria del 20% al tiempo de procesamiento
    variation = processing_time * 0.3
    random_adjustment = random.uniform(-variation, variation)
    adjusted_processing_time = processing_time + random_adjustment

    # Hacer el sleep con el tiempo ajustado
    time.sleep(adjusted_processing_time)
    
    return chunk

# Función para manejar el progreso de manera segura
def update_progress(step, total_steps):
    global completed_chunks
    with progress_lock:
        completed_chunks += 1
        progress = int((completed_chunks / total_steps) * 100)
        print(f"Progreso: {progress}%")

# Función principal que se ejecuta por cada fragmento del dataset
def process_chunk(chunk, step, total_steps):
    print(f"Procesando chunk {step+1} de {total_steps}...")
    
    # Segunda ronda: normalización
    chunk = normalize_data(chunk)
    
    # Actualizar el progreso
    update_progress(step, total_steps)
    
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

    # Procesar los chunks en paralelo usando ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=num_threads) as executor:
        results = list(executor.map(process_chunk, chunks, range(num_chunks), [num_chunks] * num_chunks))
    
    # Unir los resultados en un solo dataframe
    final_data = pd.concat(results)
    
    # Guardar los datos procesados
    final_data.to_csv('./data/processed_data.csv', index=False)
    print("Procesamiento completado y datos guardados en 'processed_data.csv'.")

if __name__ == "__main__":
    # Obtener el número de hilos de los argumentos de línea de comandos
    if len(sys.argv) != 2:
        print("Uso: python script.py <num_hilos>")
        sys.exit(1)

    num_threads = int(sys.argv[1])
    main(num_threads)
