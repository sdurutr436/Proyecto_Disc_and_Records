# ✅ Docker Setup - COMPLETADO

La aplicación Discs and Records está ahora completamente dockerizada y en funcionamiento. Todos los contenedores iniciaron exitosamente.

## 🎯 Acceso a la aplicación

### Frontend (Aplicación Web)
- **URL**: `http://localhost`
- **Puerto**: 80 (HTTP)
- **Tecnología**: Angular + Nginx

### Backend (API REST)
- **URL Base**: `http://localhost:8080`
- **API Endpoints**: `http://localhost:8080/api/`
- **Documentación Swagger**: `http://localhost:8080/swagger-ui.html`
- **Puerto**: 8080

### Base de Datos
- **Host**: `localhost`
- **Puerto**: 3307
- **Database**: `discsandrecords`
- **Usuario**: `discs_user`
- **Contraseña**: `securePassword123!`
- **Tipo**: MariaDB 11.3.2

## 👤 Credenciales de Login

### Usuario Admin
- **Email**: `admin@discsandrecords.com`
- **Contraseña**: `Admin123!`
- **Rol**: `ROLE_ADMIN`

## 🚀 Comandos Útiles

### Iniciar los contenedores
```bash
docker-compose up -d
```

### Ver logs en tiempo real
```bash
# Backend
docker logs -f discs-and-records-api

# Frontend
docker logs -f discs-and-records-web

# Base de datos
docker logs -f discs-and-records-db
```

### Detener los contenedores
```bash
docker-compose down
```

### Detener e limpiar volúmenes (resetear BD)
```bash
docker-compose down -v
```

## ⚙️ Configuración de la Aplicación

### Variables de Entorno Activas

**Backend (Spring Boot)**
- `SPRING_PROFILES_ACTIVE=docker`
- `SPRING_DATASOURCE_URL=jdbc:mariadb://database:3306/discsandrecords`
- `SPRING_DATASOURCE_USERNAME=discs_user`
- `SPRING_DATASOURCE_PASSWORD=securePassword123!`
- `SPRING_JPA_HIBERNATE_DDL_AUTO=create-drop`
- `SPRING_JPA_DEFER_DATASOURCE_INITIALIZATION=true`
- `ALLOWED_ORIGINS=http://localhost:80,http://localhost,http://localhost:4200`

**Frontend (Angular)**
- API Endpoint Auto-detect: `http://backend:8080/api` (Docker) o `http://localhost:8080/api` (Local)

### Base de Datos
- **Inicialización**: `create-drop` (recrea tablas en cada inicio)
- **Datos de Prueba**: Cargados desde `import.sql`
- **Perfil**: `application-docker.properties`

## 📊 Estado de los Contenedores

Todos los contenedores están **Healthy** y listos para usar:

```
✅ discs-and-records-api    (Spring Boot - Puerto 8080)
✅ discs-and-records-web    (Nginx - Puerto 80)
✅ discs-and-records-db     (MariaDB - Puerto 3307)
```

## 🔍 Verificación Rápida

### Chequear que el backend está responde
```bash
curl http://localhost:8080/api/health
```

### Chequear que el frontend está sirviendo
```bash
curl http://localhost
```

### Acceder a la documentación de la API
```
http://localhost:8080/swagger-ui.html
```

## 🛠️ Troubleshooting

### Si los contenedores no inician
1. Limpiar volúmenes: `docker-compose down -v`
2. Reconstruir imágenes: `docker-compose build --no-cache`
3. Iniciar nuevamente: `docker-compose up -d`

### Si hay errores de conexión
- Esperar 30-60 segundos para que la BD se inicialice completamente
- Verificar que el puerto 3307 no está en uso por otro proceso

### Ver logs completos
```bash
docker-compose logs
```

## 📝 Cambios Realizados

1. ✅ Configuración de Docker Compose para 3 servicios
2. ✅ Dockerfile multi-stage para Backend (Spring Boot)
3. ✅ Dockerfile multi-stage para Frontend (Nginx + Angular)
4. ✅ Variables de entorno configuradas
5. ✅ CORS habilitado para comunicación local
6. ✅ API endpoint auto-detección en Frontend
7. ✅ Base de datos inicializada automáticamente
8. ✅ Usuario ADMIN creado automáticamente
9. ✅ Health checks configurados
10. ✅ Documentación actualizada

## 🎓 Próximos Pasos

- Puedes desarrollar en local sin Docker y ejecutar con `npm start` en frontend y Maven en backend
- Para producción, ajusta `ddl-auto` a `validate` en lugar de `create-drop`
- Considera agregar nginx.prod.conf para configuraciones de producción
- Revisa los logs regularmente: `docker logs -f [container-name]`

---

**Estado Final**: ✅ APLICACIÓN COMPLETA Y FUNCIONAL
