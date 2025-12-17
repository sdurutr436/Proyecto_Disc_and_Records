# Despliegue y sistemas CI/CD Discs & Records

> **Proyecto:** Discs & Records
> **Tipo:** Aplicación web estilo Letterboxd para música
> **Fecha:** 17 de diciembre de 2025

---

# CI/CD y DevOps - Pipeline Docker y Despliegue

Documento técnico centrado en automatización CI/CD, publicación de imágenes y ejecución en contenedores (Docker y Docker Compose).

## GitHub Actions (CI/CD)
Este repositorio utiliza un workflow para construir y publicar imágenes Docker del backend y frontend en Docker Hub usando Buildx y caché de GitHub Actions.
En eventos `pull_request`, el workflow construye pero no hace push (evita usar secretos en PRs).

### Workflow
```yml
name: Build and Push Docker Images

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
  workflow_dispatch:

env:
  REGISTRY: docker.io
  DOCKERHUB_USERNAME: ${{ secrets.DOCKERHUB_USERNAME }}

jobs:
  build-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        if: github.event_name != 'pull_request'
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - uses: docker/metadata-action@v5
        id: meta-backend
        with:
          images: ${{ secrets.DOCKERHUB_USERNAME }}/discs-and-records-backend
          tags: |
            type=ref,event=branch
            type=sha,prefix=,format=short
            type=raw,value=latest,enable={{is_default_branch}}
      - uses: docker/build-push-action@v6
        with:
          context: ./backend
          file: ./backend/Dockerfile
          push: ${{ github.event_name != "pull_request" }}
          tags: ${{ steps.meta-backend.outputs.tags }}
          labels: ${{ steps.meta-backend.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          platforms: linux/amd64

  build-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        if: github.event_name != 'pull_request'
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - uses: docker/metadata-action@v5
        id: meta-frontend
        with:
          images: ${{ secrets.DOCKERHUB_USERNAME }}/discs-and-records-frontend
          tags: |
            type=ref,event=branch
            type=sha,prefix=,format=short
            type=raw,value=latest,enable={{is_default_branch}}
      - uses: docker/build-push-action@v6
        with:
          context: ./frontend
          file: ./frontend/Dockerfile
          push: ${{ github.event_name != "pull_request" }}
          tags: ${{ steps.meta-frontend.outputs.tags }}
          labels: ${{ steps.meta-frontend.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          platforms: linux/amd64
```

### Aspectos destacables
- Builds paralelos por servicio (backend/frontend).
- Publicación condicionada (no push en pull_request).
- Etiquetado consistente: rama, SHA corto y `latest` solo en la rama por defecto.
- Caché de capas con `type=gha` para acelerar builds repetidos.

## Docker Compose
El repositorio incluye un compose orientado a desarrollo (build desde Dockerfile) y otro orientado a producción (pull de imágenes ya publicadas en Docker Hub).

## Notas de seguridad
- Los secretos de Docker Hub (`DOCKERHUB_USERNAME` y `DOCKERHUB_TOKEN`) deben estar configurados en GitHub Secrets y, si se usa `environment`, también pueden estar protegidos por reglas de entorno.
- Evitar valores de ejemplo inseguros para JWT y contraseñas en producción; usar secretos y rotación de credenciales.