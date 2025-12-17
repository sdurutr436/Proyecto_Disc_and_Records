# ===========================================
# Dockerfile para Backend Spring Boot
# Multi-stage build optimizado para MariaDB/MySQL
# ===========================================

# --- Stage 1: Build con Maven ---
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

# Instalar Maven
RUN apk add --no-cache maven

# Copiar solo archivos de dependencias primero (mejor caché)
COPY pom.xml .

# Descargar dependencias (capa cacheada)
RUN mvn dependency:go-offline -B -q

# Copiar código fuente
COPY src ./src

# Build del proyecto (skip tests para acelerar)
RUN mvn clean package -DskipTests -B -q

# --- Stage 2: Runtime ligero ---
FROM eclipse-temurin:21-jre-alpine AS production

WORKDIR /app

# Instalar curl para healthcheck (más ligero que wget en alpine)
RUN apk add --no-cache curl && \
    addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Copiar JAR desde stage de build
COPY --from=builder --chown=appuser:appgroup /app/target/*.jar app.jar

# Usar usuario no-root
USER appuser

# Exponer puerto 8080
EXPOSE 8080

# Variables de entorno optimizadas para contenedores
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:InitialRAMPercentage=50.0 -Djava.security.egd=file:/dev/./urandom"
ENV SPRING_PROFILES_ACTIVE=docker

# Healthcheck permisivo
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=10 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Ejecutar aplicación
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
