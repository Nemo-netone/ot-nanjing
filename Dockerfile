FROM eclipse-temurin:8-jre

WORKDIR /app
COPY target/nanjing.jar /app/nanjing.jar

EXPOSE 8080
CMD ["java", "-jar", "/app/nanjing.jar"]
