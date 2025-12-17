# ===========================================
# Dockerfile para Frontend Angular
# Multi-stage build optimizado
# ===========================================

# --- Stage 1: Build ---
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias primero (mejor caché)
COPY package*.json ./

# Instalar dependencias con caché limpia
RUN npm ci --prefer-offline --no-audit

# Copiar código fuente
COPY . .

# Build de producción
RUN npm run build -- --configuration=production

# --- Stage 2: Serve con Nginx (imagen mínima) ---
FROM nginx:alpine-slim AS production

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar build de Angular desde stage anterior
COPY --from=builder /app/dist/Proyecto_Disc_and_Records/browser /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Healthcheck permisivo
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=5 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Nginx se ejecuta en foreground
CMD ["nginx", "-g", "daemon off;"]
