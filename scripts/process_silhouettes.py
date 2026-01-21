#!/usr/bin/env python3
"""
Script de Limpieza de Imágenes para Siluetas
=============================================

Este script procesa imágenes B/N (siluetas) y las convierte en WebP
con fondo transparente y silueta en negro puro.

PROCESO:
1. Detecta el color blanco (o muy claro) y lo convierte en Transparente
2. Convierte la parte negra en Negro Puro (0,0,0)
3. Redimensiona a 1200px máximo (para no tener archivos 4K gigantes)
4. Guarda como .webp optimizado

USO:
1. Coloca las imágenes originales en la carpeta 'raw_images'
2. Ejecuta: python process_silhouettes.py
3. Las imágenes procesadas aparecerán en 'frontend/src/assets/images/hero'

REQUISITOS:
pip install Pillow numpy
"""

from PIL import Image
import os
import numpy as np

# ========================================
# CONFIGURACIÓN
# ========================================

# Carpeta de entrada con imágenes originales (siluetas de artistas)
INPUT_DIR = 'frontend/src/assets'

# Carpeta de salida para assets del hero
OUTPUT_DIR = 'frontend/src/assets/images/hero'

# Dimensiones máximas (mantiene aspect ratio)
MAX_SIZE = (1200, 1200)

# Umbral para detectar áreas blancas (0-255)
# Valores más altos = más tolerante con grises claros
WHITE_THRESHOLD = 200

# Calidad WebP (0-100)
WEBP_QUALITY = 85


def process_stencil(filename: str) -> bool:
    """
    Procesa una imagen de silueta.
    
    Args:
        filename: Nombre del archivo a procesar
        
    Returns:
        True si se procesó correctamente, False si se omitió
    """
    # Solo procesar imágenes
    if not filename.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp', '.tiff')):
        return False
    
    img_path = os.path.join(INPUT_DIR, filename)
    
    try:
        # Abrir y convertir a RGBA
        img = Image.open(img_path).convert("RGBA")
        print(f"📂 Procesando: {filename} ({img.width}x{img.height})")
        
        # 1. Redimensionar si excede el máximo (Optimización Fase 5)
        if img.width > MAX_SIZE[0] or img.height > MAX_SIZE[1]:
            img.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
            print(f"   📐 Redimensionado a: {img.width}x{img.height}")
        
        # 2. Convertir a Array NumPy para manipulación rápida
        data = np.array(img)
        
        # 3. Extraer canales (transpuestos para facilitar operaciones)
        r, g, b, a = data.T
        
        # 4. Definir áreas blancas (todos los canales > umbral)
        white_areas = (r > WHITE_THRESHOLD) & (g > WHITE_THRESHOLD) & (b > WHITE_THRESHOLD)
        
        # 5. Hacer transparente lo blanco
        data[..., 3][white_areas.T] = 0  # Alpha = 0
        
        # 6. Hacer lo oscuro totalmente negro (para limpiar ruido gris)
        dark_areas = ~white_areas
        data[..., 0][dark_areas.T] = 0  # R = 0
        data[..., 1][dark_areas.T] = 0  # G = 0
        data[..., 2][dark_areas.T] = 0  # B = 0
        data[..., 3][dark_areas.T] = 255  # Alpha = 255 (opaco)
        
        # 7. Crear nueva imagen desde el array procesado
        new_img = Image.fromarray(data)
        
        # 8. Generar nombre de salida
        name_no_ext = os.path.splitext(filename)[0]
        # Normalizar nombre (snake_case)
        normalized_name = name_no_ext.lower().replace(' ', '_').replace('-', '_')
        output_path = os.path.join(OUTPUT_DIR, f"{normalized_name}.webp")
        
        # 9. Guardar como WebP optimizado
        new_img.save(output_path, 'WEBP', quality=WEBP_QUALITY, method=6)
        
        # Calcular reducción de tamaño
        original_size = os.path.getsize(img_path)
        new_size = os.path.getsize(output_path)
        reduction = ((original_size - new_size) / original_size) * 100
        
        print(f"   ✅ Guardado: {output_path}")
        print(f"   📉 Tamaño: {original_size/1024:.1f}KB → {new_size/1024:.1f}KB ({reduction:.1f}% reducción)")
        
        return True
        
    except Exception as e:
        print(f"   ❌ Error procesando {filename}: {e}")
        return False


def main():
    """Función principal del script."""
    
    print("=" * 60)
    print("🎨 PROCESADOR DE SILUETAS PARA HERO BACKDROP")
    print("=" * 60)
    
    # Crear directorio de salida si no existe
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"📁 Directorio de entrada: {INPUT_DIR}")
    print(f"📁 Directorio de salida: {OUTPUT_DIR}")
    print(f"📏 Dimensiones máximas: {MAX_SIZE[0]}x{MAX_SIZE[1]}")
    print(f"🎯 Umbral blanco: {WHITE_THRESHOLD}")
    print("-" * 60)
    
    # Verificar que existe el directorio de entrada
    if not os.path.exists(INPUT_DIR):
        print(f"\n⚠️  El directorio '{INPUT_DIR}' no existe.")
        print(f"   Créalo y coloca tus imágenes de siluetas ahí.")
        os.makedirs(INPUT_DIR, exist_ok=True)
        print(f"   ✅ Directorio '{INPUT_DIR}' creado.")
        return
    
    # Listar archivos
    files = os.listdir(INPUT_DIR)
    if not files:
        print(f"\n⚠️  No hay archivos en '{INPUT_DIR}'")
        return
    
    # Procesar cada archivo
    processed = 0
    skipped = 0
    
    for filename in sorted(files):
        if process_stencil(filename):
            processed += 1
        else:
            skipped += 1
    
    # Resumen
    print("-" * 60)
    print(f"📊 RESUMEN:")
    print(f"   ✅ Procesados: {processed}")
    print(f"   ⏭️  Omitidos: {skipped}")
    print("=" * 60)


if __name__ == "__main__":
    main()
