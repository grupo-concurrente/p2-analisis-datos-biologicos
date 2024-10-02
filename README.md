# 🧬 Umbrella Corporation - Sistema de Análisis de Datos Concurrente

Este repositorio contiene el **monorepo** para el sistema de análisis de datos concurrente de **Umbrella Corporation**, desarrollado para gestionar flujos de datos biológicos en tiempo real. Está compuesto por tres servicios principales: **backend (Java)**, **frontend (React)** y **base de datos (PostgreSQL)**, los cuales se pueden levantar utilizando **Docker Compose**.

## 📋 Descripción

El sistema está diseñado para procesar grandes volúmenes de datos biológicos (genéticos, bioquímicos, físicos) obtenidos de múltiples fuentes en tiempo real, utilizando técnicas avanzadas de **programación multihilo y multiproceso** en **Java**. El objetivo principal es garantizar la eficiencia y consistencia de los datos mediante la sincronización adecuada de los procesos concurrentes.

El backend implementa la lógica de procesamiento concurrente, mientras que el frontend permite visualizar métricas en tiempo real y gestionar el sistema de manera interactiva.

## 🏗️ Arquitectura General

El monorepo incluye:

- **Backend (Java)**: Procesamiento concurrente con **@Async**, **ExecutorService**, y **ForkJoinPool**.
- **Frontend (React)**: Interfaz gráfica para la monitorización y gestión del sistema.
- **PostgreSQL**: Base de datos para almacenar los datos biológicos procesados.
- **Docker Compose**: Orquestación de los servicios para una fácil configuración y despliegue.

### Tecnologías clave:

- **Spring Boot**: Framework principal del backend para gestionar la concurrencia y el procesamiento.
- **Monitorización**: Uso de herramientas para supervisar el estado del sistema y los hilos.
- **React.js**: Frontend interactivo para visualización de métricas y control del sistema.

## 🚀 Instalación y Ejecución

Sigue estos pasos para levantar el sistema completo:

### 1. Clonar el repositorio:

```bash
git clone https://github.com/umbrella-corporation/data-analysis-system.git
cd data-analysis-system
```

### 2. Levantar los servicios con Docker Compose:

#### Solo BBDD (Postgres) + Servidor Backend:

```bash
docker compose up postgres_db backend
```

#### Aplicación completa (BBDD + Backend + Frontend)

```bash
docker compose up
```

### 4. Acceder a la aplicación:

- **Backend**: El backend se ejecuta en `http://localhost:8080`.
- **Frontend**: La interfaz web está disponible en `http://localhost:5173`.

## 🔍 Monitorización del Sistema

El sistema incluye herramientas para la monitorización del rendimiento, incluyendo:

- **Gráficos en tiempo real**: Visualización del rendimiento del procesamiento de datos.
- **Logs detallados**: Para el seguimiento de eventos y posibles errores.

---
