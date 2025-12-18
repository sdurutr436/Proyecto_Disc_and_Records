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

**IMPORTANTE**: Introduce los **valores reales**, NO los placeholders `${...}`.

```bash
# Perfil de Spring (OBLIGATORIO)
SPRING_PROFILES_ACTIVE=docker

# JWT Configuration (OBLIGATORIO)
JWT_SECRET=eXNVUzJTX2Rpc2NzX2FuZF9yZWNvcmRzX3NlY3JldF9rZXlfMjAyNF9zZWN1cmU=
JWT_EXPIRATION=86400000
```

**Para la base de datos, elige UNA de estas opciones:**

#### Opción A: Sin base de datos (solo para pruebas iniciales)

Usa H2 en memoria modificando temporalmente el perfil:

```bash
SPRING_PROFILES_ACTIVE=dev
```

#### Opción B: Managed Database de DigitalOcean (recomendado para producción)

1. Crea una **Managed Database** MariaDB/MySQL en DigitalOcean
2. Ve a **Settings** > **production-backend** > **Add Database**
3. Selecciona tu base de datos creada
4. DigitalOcean añadirá automáticamente:
   - `${db.DATABASE_URL}` → Se resuelve automáticamente
   - `${db.USERNAME}` → Se resuelve automáticamente  
   - `${db.PASSWORD}` → Se resuelve automáticamente

Luego añade manualmente:
```bash
SPRING_DATASOURCE_URL=${db.DATABASE_URL}
SPRING_DATASOURCE_USERNAME=${db.USERNAME}
SPRING_DATASOURCE_PASSWORD=${db.PASSWORD}
```

#### Opción C: Managed Database ya creada (tienes las credenciales)

Si ya tienes una base de datos MySQL/MariaDB de DigitalOcean con estas credenciales:
```
username = doadmin
password = ************************
host = db-mysql-do-user-30328303-0.f.db.ondigitalocean.com
port = 25060
database = defaultdb
sslmode = REQUIRED
```

**Configura EXACTAMENTE así en DigitalOcean (Environment Variables del backend):**

```bash
SPRING_PROFILES_ACTIVE=docker
SPRING_DATASOURCE_URL=jdbc:mariadb://db-mysql-do-user-30328303-0.f.db.ondigitalocean.com:25060/defaultdb?sslMode=REQUIRED
SPRING_DATASOURCE_USERNAME=doadmin
SPRING_DATASOURCE_PASSWORD=tu_password_real_aqui
JWT_SECRET=eXNVUzJTX2Rpc2NzX2FuZF9yZWNvcmRzX3NlY3JldF9rZXlfMjAyNF9zZWN1cmU=
JWT_EXPIRATION=86400000
```

**IMPORTANTE**: Reemplaza `tu_password_real_aqui` con la contraseña que te mostraron (haz click en "show").

#### Opción D: Base de datos externa (fuera de DigitalOcean)

**IMPORTANTE**: Introduce la URL completa real, NO uses `${...}`:

```bash
# Ejemplo con valores REALES (reemplaza con los tuyos)
SPRING_DATASOURCE_URL=jdbc:mariadb://tu-servidor.com:3306/discsandrecords?useSSL=true
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=tu_password_seguro_aqui
```

## Despliegue Rápido sin Base de Datos (Pruebas)

Si solo quieres probar el despliegue sin configurar una base de datos:

**Variables mínimas requeridas:**
```bash
SPRING_PROFILES_ACTIVE=dev
JWT_SECRET=eXNVUzJTX2Rpc2NzX2FuZF9yZWNvcmRzX3NlY3JldF9rZXlfMjAyNF9zZWN1cmU=
JWT_EXPIRATION=86400000
```

Esto usará H2 en memoria (datos se pierden al reiniciar). **Solo para pruebas**, no para producción.

## Configuración de Base de Datos para Producción

Una vez que el backend arranque correctamente con H2, configura la base de datos:

### Opción 1: Managed Database de DigitalOcean (recomendado)

1. En DigitalOcean, crea **Databases** > **Create Database** > MariaDB
2. Una vez creada, ve a **App Platform** > Tu App > **Settings** > **production-backend**
3. Click en **Add Database** y selecciona la BD que creaste
4. DigitalOcean inyectará automáticamente `${db.*}` variables
5. Añade manualmente estas variables:
   ```bash
   SPRING_PROFILES_ACTIVE=docker
   SPRING_DATASOURCE_URL=${db.DATABASE_URL}
   SPRING_DATASOURCE_USERNAME=${db.USERNAME}
   SPRING_DATASOURCE_PASSWORD=${db.PASSWORD}
   ```

### Opción 2: Base de datos externa (tu propio servidor)

```bash
SPRING_PROFILES_ACTIVE=docker
SPRING_DATASOURCE_URL=jdbc:mariadb://tu-host.com:3306/discsandrecords?useSSL=true
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=tu_password_real_aqui
```

**IMPORTANTE**: No uses placeholders `${...}` a menos que sea una variable inyectada por DigitalOcean.

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
8. **Environment Variables** (OBLIGATORIO - mínimo para empezar):
   ```bash
   # Mínimo para arrancar sin BD (solo pruebas)
   SPRING_PROFILES_ACTIVE=dev
   JWT_SECRET=eXNVUzJTX2Rpc2NzX2FuZF9yZWNvcmRzX3NlY3JldF9rZXlfMjAyNF9zZWN1cmU=
   JWT_EXPIRATION=86400000
   ```
   
   **Para producción con BD**, cambia el perfil y añade:
   ```bash
   SPRING_PROFILES_ACTIVE=docker
   SPRING_DATASOURCE_URL=jdbc:mariadb://tu-servidor:3306/discsandrecords
   SPRING_DATASOURCE_USERNAME=tu_usuario
   SPRING_DATASOURCE_PASSWORD=tu_password
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

## Acceso a la Aplicación Desplegada

### URL de DigitalOcean (automática)

Una vez desplegada, tu aplicación estará disponible en:
```
https://nombre-de-tu-app-xxxxx.ondigitalocean.app
```

Puedes encontrar la URL exacta en:
- **App Platform** > Tu App > **Settings** > pestaña **Domains**

### Configurar Dominio Personalizado (discs-n-records.es)

Si tienes un dominio propio, configúralo así:

1. **En DigitalOcean:**
   - Ve a **App Platform** > Tu App > **Settings** > **Domains**
   - Click en **Add Domain**
   - Ingresa `discs-n-records.es` y `www.discs-n-records.es`
   - DigitalOcean te mostrará los registros DNS a configurar

2. **En tu proveedor de dominio (GoDaddy, Namecheap, etc.):**
   - Añade un registro **CNAME** para `www` apuntando a la URL de DigitalOcean
   - Añade un registro **A** para el dominio raíz con la IP que te proporcione DigitalOcean
   - **IMPORTANTE**: La propagación DNS puede tardar 24-48 horas

3. **Verificación:**
   - Una vez propagado, accede a `https://discs-n-records.es`
   - DigitalOcean proporciona SSL/TLS automáticamente (Let's Encrypt)

**Mientras tanto**, usa la URL de DigitalOcean (.ondigitalocean.app) para acceder a tu aplicación.

---

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

### Error: SQL Syntax en MySQL/MariaDB (DROP CONSTRAINT IF EXISTS)

**Causa**: Hibernate está generando sintaxis de PostgreSQL incompatible con MySQL/MariaDB

**Síntomas**: Logs muestran `Error: 1064-42000: You have an error in your SQL syntax... near 'if exists'`

**Solución aplicada**: Cambiar dialecto de Hibernate en `application-docker.properties`:

```properties
# Cambiar de MariaDBDialect a MySQLDialect
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Evitar sintaxis incompatible
spring.jpa.properties.hibernate.globally_quoted_identifiers=false
spring.jpa.properties.hibernate.globally_quoted_identifiers_skip_column_definitions=true
```

**NOTA**: Los warnings de `DROP CONSTRAINT IF EXISTS` no impiden que la app arranque, pero es mejor corregirlos.

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

### Error: "Driver claims to not accept jdbcUrl, ${SPRING_DATASOURCE_URL}"

**Causa**: Pusiste el placeholder literal `${SPRING_DATASOURCE_URL}` en vez del valor real de la URL

**Solución**:

**INCORRECTO** (no hagas esto):
```bash
SPRING_DATASOURCE_URL=${SPRING_DATASOURCE_URL}  ❌
```

**CORRECTO** (valores reales):
```bash
# Opción 1: Sin BD (solo pruebas)
SPRING_PROFILES_ACTIVE=dev

# Opción 2: Managed Database (usa ${db.*} solo si conectaste la BD desde DigitalOcean)
SPRING_DATASOURCE_URL=${db.DATABASE_URL}  ✓ (solo si añadiste la BD desde la UI)

# Opción 3: BD externa (valor real completo)
SPRING_DATASOURCE_URL=jdbc:mariadb://tu-host.com:3306/discsandrecords  ✓
SPRING_DATASOURCE_USERNAME=admin  ✓
SPRING_DATASOURCE_PASSWORD=tu_password  ✓
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
