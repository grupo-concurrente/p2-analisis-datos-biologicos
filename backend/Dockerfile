# Usamos una imagen base de JDK 17 para correr la aplicación Java
FROM openjdk:17-jdk-alpine

# Instalamos Python 3
RUN apk add --no-cache python3

# Copiar todos los archivos y carpetas del directorio actual al contenedor
COPY . /app
COPY target/backend-0.0.1-SNAPSHOT.jar /app/backend.jar

# Establecemos el directorio de trabajo
WORKDIR /app

# Damos permisos de ejecución al Maven Wrapper
RUN chmod +x mvnw

# Exponemos el puerto en el que el backend escucha
EXPOSE 8080

# Comando para ejecutar el backend cuando el contenedor arranca
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/urandom","-jar","/app/backend.jar"]
#ENTRYPOINT ["./mvnw","spring-boot:run"]
