FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} evaluacion-service.jar
ENTRYPOINT ["java","-jar","./evaluacion-service.jar"]