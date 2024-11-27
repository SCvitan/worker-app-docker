# Use the official OpenJDK 21 image from Docker Hub
FROM openjdk:21-jdk-slim as build

# Set the working directory in the container
WORKDIR /app

# Copy the built JAR file from the host machine to the container
COPY target/work-app-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the app will run on
EXPOSE 8080

# Set the entry point for the container to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
