# Configuración de Despliegue en DigitalOcean App Platform

Este documento describe la configuración necesaria para desplegar la aplicación Discs & Records en DigitalOcean App Platform.

## Arquitectura de Despliegue

La aplicación utiliza:
- **Frontend**: Angular con Nginx (puerto 80)
- **Backend**: Spring Boot (puerto 8080)
- **Enrutado**: HTTP Request Routes de App Platform

## Componentes en DigitalOcean

### 1. Frontend (`production-frontend`)

**Tipo**: Web Service

**Configuración básica:**
- **Source directory**: `frontend`
- **Build strategy**: Dockerfile
- **Dockerfile stage**: `production`
- **Public HTTP port**: 80
- **Instance size**: 512 MB RAM / 1 Shared vCPU

**HTTP Request Route:**
- **Route Path**: `/`
- **Preserve Path Prefix**: No

### 2. Backend (`production-backend`)

**Tipo**: Web Service

**Configuración básica:**
- **Source directory**: `backend`
- **Build strategy**: Dockerfile
- **Dockerfile stage**: `production`
- **Public HTTP port**: 8080
- **Instance size**: 512 MB RAM / 1 Shared vCPU

**HTTP Request Route:**
- **Route Path**: `/api`
- **Preserve Path Prefix**: Sí (si el backend espera `/api/...`)

**Nota importante:** El backend debe estar configurado para aceptar peticiones en `/api/*`. Si el backend no tiene el prefijo `/api` en sus controladores, desactiva "Preserve Path Prefix".

## Variables de Entorno

### Backend (REQUERIDAS)

Configura estas variables en **Settings** > **production-backend** > **Environment Variables**:

```bash
# Perfil de Spring
SPRING_PROFILES_ACTIVE=docker

# JWT Configuration (OBLIGATORIO)
JWT_SECRET=eXNVUzJTX2Rpc2NzX2FuZF9yZWNvcmRzX3NlY3JldF9rZXlfMjAyNF9zZWN1cmU=
JWT_EXPIRATION=86400000

# Database Configuration (OBLIGATORIO)
SPRING_DATASOURCE_URL=jdbc:mariadb://host:port/database
SPRING_DATASOURCE_USERNAME=tu_usuario
SPRING_DATASOURCE_PASSWORD=tu_password

# JVM Optimization (opcional pero recomendado)
JAVA_OPTS=-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:InitialRAMPercentage=50.0 -Djava.security.egd=file:/dev/./urandom
```

### Base de datos

**Opción 1: Managed Database de DigitalOcean (recomendado)**

1. Crea una base de datos MariaDB/MySQL en DigitalOcean
2. En la configuración del backend, añade las variables:
   ```bash
   SPRING_DATASOURCE_URL=${db.DATABASE_URL}
   SPRING_DATASOURCE_USERNAME=${db.USERNAME}
   SPRING_DATASOURCE_PASSWORD=${db.PASSWORD}
   ```

**Opción 2: Base de datos externa**

Configura manualmente las variables con tu servidor de BD:
```bash
SPRING_DATASOURCE_URL=jdbc:mariadb://tu-servidor:3306/discsandrecords?useSSL=true
SPRING_DATASOURCE_USERNAME=tu_usuario
SPRING_DATASOURCE_PASSWORD=tu_password_seguro
```

### JWT Secret - Generar uno nuevo

**IMPORTANTE**: Para producción, genera un JWT_SECRET único usando:

```bash
# En Linux/Mac/WSL
echo -n "tu_clave_super_secreta_aqui_$(date +%s)" | base64

# En PowerShell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("tu_clave_super_secreta_aqui_$(Get-Date -Format 'yyyyMMddHHmmss')"))
```

El secreto debe tener al menos 256 bits (32 caracteres) antes de codificar en Base64.

## Pasos de Configuración

### 1. Crear la App en DigitalOcean

1. Ve a **App Platform** > **Create App**
2. Conecta tu repositorio de GitHub: `sdurutr436/Proyecto_Disc_and_Records`
3. Selecciona la rama: `master`

### 2. Configurar el Backend

1. **Add Resource** > **Web Service**
2. Nombre: `production-backend`
3. Source Directory: `backend`
4. Build Command: (automático por Dockerfile)
5. Run Command: (vacío, usa Dockerfile ENTRYPOINT)
6. HTTP Port: `8080`
7. **HTTP Routes**:
   - Path: `/api`
   - Preserve Path Prefix: `Yes`
8. **Environment Variables** (OBLIGATORIO):
   ```
   JWT_SECRET=eXNVUzJTX2Rpc2NzX2FuZF9yZWNvcmRzX3NlY3JldF9rZXlfMjAyNF9zZWN1cmU=
   JWT_EXPIRATION=86400000
   SPRING_DATASOURCE_URL=jdbc:mariadb://host:port/database
   SPRING_DATASOURCE_USERNAME=tu_usuario
   SPRING_DATASOURCE_PASSWORD=tu_password
   SPRING_PROFILES_ACTIVE=docker
   ```

### 3. Configurar el Frontend

1. **Add Resource** > **Web Service**
2. Nombre: `production-frontend`
3. Source Directory: `frontend`
4. Build Command: (automático por Dockerfile)
5. Run Command: (vacío, usa Dockerfile CMD)
6. HTTP Port: `80`
7. **HTTP Routes**:
   - Path: `/`

### 4. Configurar Auto-Deploy

Habilita **Auto-deploy on push** para que cada push a `master` despliegue automáticamente.

## Verificación del Despliegue

### Health Checks

Los Dockerfiles ya incluyen healthchecks:

**Backend:**
```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=10 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1
```

**Frontend:**
```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=5 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1
```

### Logs

Accede a los logs desde la UI de DigitalOcean:
- **App Platform** > Tu App > **Runtime Logs**

### Endpoints de Prueba

Una vez desplegado:
- **Frontend**: `https://tu-app.ondigitalocean.app/`
- **API**: `https://tu-app.ondigitalocean.app/api/...`

## Solución de Problemas

### Error: "host 'backend' not found in upstream"

**Causa**: El nginx.conf del frontend intentaba hacer proxy a `http://backend:8080`

**Solución aplicada**: Se eliminó el bloque `location /api/` del nginx.conf y se configuró el enrutado mediante HTTP Request Routes de App Platform.

### Error: "Could not resolve placeholder 'JWT_SECRET'"

**Causa**: Falta configurar variables de entorno en el componente backend

**Solución**: 
1. Ve a **Settings** > **production-backend** > **Environment Variables**
2. Añade las variables obligatorias:
   - `JWT_SECRET`: Clave secreta en Base64 (mínimo 256 bits)
   - `JWT_EXPIRATION`: Tiempo de expiración en ms (ej: `86400000` = 24h)
   - `SPRING_DATASOURCE_URL`: URL de conexión a la base de datos
   - `SPRING_DATASOURCE_USERNAME`: Usuario de BD
   - `SPRING_DATASOURCE_PASSWORD`: Contraseña de BD

**Valor temporal para pruebas** (cambiar en producción):
```bash
JWT_SECRET=eXNVUzJTX2Rpc2NzX2FuZF9yZWNvcmRzX3NlY3JldF9rZXlfMjAyNF9zZWN1cmU=
```

### Error: "Angular compiler warnings"

Revisa las advertencias del compilador Angular sobre el uso de `?.` vs `.` en los templates. Aunque no bloquean el despliegue, es recomendable corregirlas.

### Base de datos no conecta

Si usas MariaDB/MySQL externo:
1. Verifica que las variables de entorno `SPRING_DATASOURCE_*` estén correctas
2. Añade la IP de App Platform al whitelist del firewall de la base de datos
3. Verifica el `SPRING_PROFILES_ACTIVE=docker` y que `application-docker.properties` exista

## Arquitectura de Networking

```
Internet
   │
   ├─> App Platform (Ingress)
       │
       ├─> Route /     → production-frontend (puerto 80)
       │                    └─> Nginx → Angular SPA
       │
       └─> Route /api  → production-backend (puerto 8080)
                            └─> Spring Boot API
```

## Costos Estimados

Con la configuración básica (512 MB RAM / 1 vCPU por servicio):
- **2 Web Services**: ~$10-12 USD/mes
- **Bandwidth**: 50 GB incluidos por servicio

## Comandos Útiles

### Ver logs en tiempo real
```bash
doctl apps logs <app-id> --follow
```

### Forzar re-deploy
```bash
doctl apps create-deployment <app-id>
```

### Ver estado de la app
```bash
doctl apps get <app-id>
```

## Referencias

- [DigitalOcean App Platform Docs](https://docs.digitalocean.com/products/app-platform/)
- [Internal Routing Guide](https://docs.digitalocean.com/products/app-platform/how-to/manage-internal-routing/)
- [Dockerfile Reference](https://docs.digitalocean.com/products/app-platform/reference/dockerfile/)
