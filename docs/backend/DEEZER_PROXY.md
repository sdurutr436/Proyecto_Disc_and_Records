# Configuración del Proxy Deezer

## Descripción

El backend incluye un proxy inteligente para la API de Deezer (`/api/deezer/**`) que resuelve varios problemas:

1. **CORS**: Deezer no permite llamadas directas desde navegadores
2. **Rate Limiting**: Controla las requests por segundo para no exceder la cuota de Deezer
3. **Caché**: Reduce llamadas repetidas con TTLs configurables
4. **Cooldown**: Evita "tormentas" de requests cuando Deezer responde con 403/429

## Arquitectura

```
[Frontend] → [/api/deezer/**] → [DeezerCacheService] → [api.deezer.com]
                                      ↓
                               [Caffeine Cache]
```

## TTLs (Time To Live)

| Tipo de Endpoint | TTL | Descripción |
|------------------|-----|-------------|
| `/search/*` | 90 segundos | Búsquedas cambian poco en el corto plazo |
| `/album/{id}`, `/tracks` | 6 horas | Datos de álbumes son estáticos |
| `/chart/*` | 10 minutos | Charts se actualizan periódicamente |

## Rate Limiting

- **Límite**: 40 requests por ventana de 5 segundos (Deezer permite ~50)
- **Comportamiento**: Si se excede, devuelve `429 Too Many Requests`
- **Header**: Incluye `Retry-After: 5` para indicar cuándo reintentar

## Cooldown

Cuando Deezer responde con **403 o 429**:

1. Se activa el modo cooldown por 60 segundos (configurable)
2. Durante ese tiempo, todas las requests responden **503 Service Unavailable**
3. El frontend deja de hacer scroll infinito y muestra mensaje al usuario
4. Tras el cooldown, se reanudan las requests normalmente

## Configuración

Variables de entorno o `application.properties`:

```properties
# Caché TTLs
deezer.cache.search-ttl-seconds=90        # Default: 90
deezer.cache.album-ttl-hours=6            # Default: 6
deezer.cache.chart-ttl-minutes=10         # Default: 10

# Rate Limiting
deezer.rate-limit.requests-per-window=40  # Default: 40
deezer.rate-limit.window-seconds=5        # Default: 5

# Cooldown
deezer.cooldown.duration-seconds=60       # Default: 60
```

Para DigitalOcean, configurar como variables de entorno:

```
DEEZER_CACHE_SEARCH_TTL=90
DEEZER_CACHE_ALBUM_TTL=6
DEEZER_CACHE_CHART_TTL=10
DEEZER_RATE_LIMIT_REQUESTS=40
DEEZER_RATE_LIMIT_WINDOW=5
DEEZER_COOLDOWN_DURATION=60
```

## Endpoint de Estadísticas

Para monitorear el proxy:

```bash
GET /api/deezer/stats
```

Respuesta:
```json
{
  "cacheHits": 150,
  "cacheMisses": 42,
  "rateLimitBlocks": 3,
  "cooldownBlocks": 0,
  "searchCacheSize": 25,
  "albumCacheSize": 100,
  "chartCacheSize": 5,
  "inCooldown": false,
  "cooldownRemainingSeconds": 0
}
```

## Comportamiento del Frontend

El frontend maneja los errores de rate limiting:

1. **429 Too Many Requests**: El `DeezerRateLimitService` detecta el error
2. **503 Service Unavailable**: Se muestra mensaje de cooldown
3. **Infinite Scroll**: Se detiene durante el cooldown
4. **Retry automático**: Tras el cooldown, el usuario puede reintentar

## Logs

El backend registra eventos importantes:

```
WARN  COOLDOWN: Bloqueando request a /search/album (45s restantes)
DEBUG CACHE HIT: /album/12345
WARN  RATE LIMIT: Bloqueando request a /chart/0/albums
ERROR DEEZER RATE LIMIT: Status 403 para /search/album
WARN  ⚠️ COOLDOWN ACTIVADO hasta 2024-01-15T12:30:00Z (60s)
INFO  ✅ Cooldown finalizado - Reanudando requests a Deezer
```

## Métricas Propias vs Deezer

**IMPORTANTE**: Las métricas de reviews y ratings vienen del backend propio, NO de Deezer:

| Campo | Origen | Descripción |
|-------|--------|-------------|
| `fans` | Deezer | **NO USAR** - No representa reviews de usuarios |
| `reviewCount` | Backend | Número de reseñas escritas por usuarios |
| `averageRating` | Backend | Puntuación media calculada de reseñas |
| `listenedCount` | Backend | Usuarios que han marcado como escuchado |

Endpoint para obtener métricas propias:
```bash
GET /api/albumes/{albumId}/stats
```

## Solución de Problemas

### Error 403 frecuente
- Verificar que el cooldown esté activo en `/api/deezer/stats`
- Aumentar `deezer.cooldown.duration-seconds` si es necesario
- Reducir `deezer.rate-limit.requests-per-window`

### Caché no funciona
- Verificar que las respuestas de Deezer sean 200
- Comprobar `*CacheSize` en `/api/deezer/stats`

### Scroll infinito no carga más
- Verificar si el frontend está en cooldown
- Revisar la consola del navegador para errores
