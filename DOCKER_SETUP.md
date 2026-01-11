# 🐳 Docker Setup - Discs & Records

## Inicio rápido

### 1. **Construir y ejecutar los contenedores**

```bash
# Navegar al directorio raíz del proyecto
cd Proyecto_Disc_and_Records

# Construir imágenes y ejecutar contenedores
docker-compose up --build
```

### 2. **Esperar a que todo esté listo**

- **Database**: ~30 segundos (MariaDB inicializando)
- **Backend**: ~60 segundos (Spring Boot arrancando + cargando data.sql)
- **Frontend**: ~10 segundos (Nginx listo)

Verás en los logs:
```
discs-and-records-api | ... Tomcat started on port(s): 8080 ...
discs-and-records-web | ... 127.0.0.1 ... GET / HTTP/1.1" 200
```

---

## 📱 Acceso a la aplicación

### **Frontend**
```
http://localhost:80
```
O simplemente: `http://localhost`

### **Backend API**
```
http://localhost:8080/api
```

### **Swagger UI (Documentación API)**
```
http://localhost:8080/swagger-ui.html
```

### **Base de datos (MySQL Workbench, DBeaver, etc.)**
```
Host:     localhost
Puerto:   3307
Usuario:  discuser (por defecto)
Password: discpass (por defecto)
Base de datos: discsandrecords
```

---

## 🔐 Login - Credenciales de prueba

### **Usuario ADMIN** (creado automáticamente en data.sql)
```
Email:    admin@discsandrecords.com
Password: Admin123!
Rol:      ADMIN
```

#### ¿Cómo iniciar sesión en el frontend?
1. Abre `http://localhost`
2. Haz click en **"Login"**
3. Usa las credenciales de arriba
4. ¡Acceso a panel de administración!

---

## 🏗️ Arquitectura de contenedores

```
┌─────────────────────────────────────────────────┐
│         Docker Compose (Red Bridge)              │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────────┐  ┌──────────────┐             │
│  │   Frontend   │  │   Backend    │             │
│  │  (Nginx)     │◄─┤  (Spring)    │             │
│  │  Puerto 80   │  │  Puerto 8080 │             │
│  └──────────────┘  │              │             │
│        ▲           │              │             │
│        │           └─────┬────────┘             │
│        │                 │                      │
│        │        ┌────────▼───────┐              │
│        └──────► │   Database     │              │
│                 │   (MariaDB)    │              │
│                 │  Puerto 3306   │              │
│                 └────────────────┘              │
│                                                  │
└─────────────────────────────────────────────────┘
```

### **Comunicación interna Docker**
- **Frontend → Backend**: `http://backend:8080/api` (nombre del servicio Docker)
- **Backend → Database**: `jdbc:mariadb://database:3306/discsandrecords` (nombre del servicio Docker)

### **Comunicación desde host (localhost)**
- **Frontend**: `http://localhost:80` o `http://localhost`
- **Backend**: `http://localhost:8080`
- **Database**: `localhost:3307` (puerto expuesto)

---

## 🔧 Variables de entorno (personalizables)

Puedes crear un archivo `.env` en la raíz del proyecto para sobrescribir valores por defecto:

```env
# Base de datos
MYSQL_DATABASE=discsandrecords
MYSQL_USER=discuser
MYSQL_PASSWORD=discpass
MYSQL_ROOT_PASSWORD=rootpass

# Backend
JWT_SECRET=tu-clave-secreta-aqui
JWT_EXPIRATION=86400000

# CORS
ALLOWED_ORIGINS=http://localhost:80,http://localhost:4200
```

Luego ejecuta:
```bash
docker-compose up --build
```

---

## 📊 Ver logs en tiempo real

```bash
# Todos los servicios
docker-compose logs -f

# Solo un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database
```

---

## 🛑 Detener y limpiar

```bash
# Detener contenedores (sin eliminarlos)
docker-compose stop

# Detener y eliminar contenedores
docker-compose down

# Eliminar contenedores + volúmenes de datos (¡limpia la BD!)
docker-compose down -v
```

---

## ✅ Checklist de verificación

- [ ] `docker-compose up --build` ejecuta sin errores
- [ ] Database: `service_healthy` después de ~30s
- [ ] Backend: `service_healthy` después de ~60s
- [ ] Frontend: `service_healthy` después de ~10s
- [ ] Frontend accesible: `http://localhost` → Carga la app
- [ ] Backend Swagger: `http://localhost:8080/swagger-ui.html` → Documentación API
- [ ] Login exitoso: `admin@discsandrecords.com` / `Admin123!`
- [ ] Dashboard de admin cargado después del login

---

## 🐛 Troubleshooting

### Frontend no carga / Página en blanco
```bash
# Revisar logs del frontend
docker-compose logs frontend

# Limpiar y reintentar
docker-compose down -v
docker-compose up --build
```

### Backend no se conecta a la BD
```bash
# Verificar que database está healthy
docker-compose logs database

# Revisar logs del backend
docker-compose logs backend
```

### "Cannot GET /api/..." (Error 404)
- Asegúrate de que backend está running: `docker-compose ps`
- Verifica CORS en logs de backend
- La URL del frontend debe apuntar a `http://backend:8080/api` (en Docker)

### Puerto ya en uso
```bash
# Ver qué está usando los puertos
netstat -ano | findstr ":80" # Windows PowerShell
lsof -i :80 # macOS/Linux

# O cambiar puerto en docker-compose.yml:
# ports:
#   - "8000:80"  # Cambiar 80 a 8000
```

---

## 📝 Archivos importantes

- `docker-compose.yml` - Orquestación de servicios
- `backend/Dockerfile` - Imagen Spring Boot
- `frontend/Dockerfile` - Imagen Angular + Nginx
- `frontend/nginx.conf` - Configuración Nginx
- `backend/src/main/resources/application-docker.properties` - Config Backend en Docker
- `backend/src/main/resources/data.sql` - Datos iniciales (usuarios, artistas, etc.)

---

## 🚀 Siguientes pasos

1. **Crea más usuarios** a través del endpoint `POST /api/auth/register`
2. **Gestiona datos** desde el dashboard admin (si tienes permisos)
3. **Integra con CI/CD** para deployments automáticos
4. **Cambiar JWT_SECRET** en producción a un valor seguro

¡Listo! 🎉
