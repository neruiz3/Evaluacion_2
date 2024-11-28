FROM eclipse-temurin:17-jre-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} evaluacion-service.jar
ENTRYPOINT ["java","-jar","./evaluacion-service.jar"]