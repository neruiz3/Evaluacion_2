FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} simulacionCredito-service.jar
ENTRYPOINT ["java","-jar","./simulacionCredito-service.jar"]