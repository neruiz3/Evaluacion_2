FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} seguimiento-service.jar
ENTRYPOINT ["java","-jar","./seguimiento-service.jar"]