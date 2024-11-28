FROM eclipse-temurin:17-jre-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} solicitud-service.jar
ENTRYPOINT ["java","-jar","./solicitud-service.jar"]