FROM openjdk:17.0.2

VOLUME /tmp

EXPOSE 8080

ARG JAR_FILE

COPY target/${JAR_FILE} proj.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/proj.jar"]

#docker build -t myapp-image --build-arg JAR_FILE=proj-0.0.1-SNAPSHOT.jar .
