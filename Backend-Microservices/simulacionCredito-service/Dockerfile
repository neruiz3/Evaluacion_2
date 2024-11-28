FROM eclipse-temurin:17-jre-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} simulacionCredito-service.jar
ENTRYPOINT ["java","-jar","./simulacionCredito-service.jar"]