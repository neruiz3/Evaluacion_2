FROM eclipse-temurin:17-jre-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} usuario-service.jar
ENTRYPOINT ["java","-jar","./usuario-service.jar"]