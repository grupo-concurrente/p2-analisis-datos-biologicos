# Usamos una imagen base de JDK 17 en Alpine
FROM openjdk:17-jdk-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalamos Python, pip y pandas usando apk (gestor de paquetes de Alpine)
RUN apk add --no-cache python3 py3-pip

# Copiamos el archivo JAR en el contenedor
COPY . .

# Exponemos el puerto en el que el backend escucha
EXPOSE 8080

# Comando para ejecutar el backend cuando el contenedor arranca
#ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/urandom", "-jar", "/app/backend.jar"]
ENTRYPOINT ["./mvnw", "spring-boot:run"]
