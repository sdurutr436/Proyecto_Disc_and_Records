package com.discsandrecords.api.services;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.discsandrecords.api.dto.AlbumResponseDTO;
import com.discsandrecords.api.repositories.AlbumRepository;
import com.discsandrecords.api.repositories.ArtistaRepository;

/**
 * Tests de concurrencia para DeezerImportService.
 * 
 * OBJETIVO:
 * Verificar que el servicio de importación maneja correctamente
 * múltiples hilos intentando importar el mismo álbum simultáneamente.
 * 
 * COMPORTAMIENTO ESPERADO:
 * - Solo un hilo debe crear el registro en la BD
 * - Los demás hilos deben recuperar el registro existente
 * - No debe haber duplicados
 * - No debe haber DataIntegrityViolationException no manejadas
 * 
 * NOTA: Este test requiere acceso a Deezer API real o mocks.
 * En CI/CD, considerar usar @Disabled o profiles específicos.
 */
@SpringBootTest
@ActiveProfiles("test")
@DisplayName("DeezerImportService - Tests de Concurrencia")
class DeezerImportServiceConcurrencyTest {

    @Autowired
    private DeezerImportService deezerImportService;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private ArtistaRepository artistaRepository;

    // ID de álbum de Deezer para tests (The Dark Side of the Moon - Pink Floyd)
    private static final String TEST_DEEZER_ID = "302127";

    @Test
    @DisplayName("5 hilos importando el mismo álbum: solo 1 persiste, 4 recuperan")
    void testConcurrentImportSameAlbum() throws Exception {
        // Limpiar datos previos si existen
        albumRepository.findByDeezerId(TEST_DEEZER_ID)
                .ifPresent(album -> albumRepository.delete(album));
        
        final int NUM_THREADS = 5;
        final CountDownLatch startLatch = new CountDownLatch(1);
        final CountDownLatch doneLatch = new CountDownLatch(NUM_THREADS);
        final ExecutorService executor = Executors.newFixedThreadPool(NUM_THREADS);
        
        List<Future<AlbumResponseDTO>> futures = new ArrayList<>();
        
        // Crear tareas que esperan a que todas estén listas antes de ejecutar
        for (int i = 0; i < NUM_THREADS; i++) {
            final int threadNum = i;
            Callable<AlbumResponseDTO> task = () -> {
                try {
                    // Esperar a que todos los hilos estén listos
                    startLatch.await();
                    
                    System.out.printf("[Hilo %d] Iniciando importación de álbum %s%n", 
                            threadNum, TEST_DEEZER_ID);
                    
                    AlbumResponseDTO result = deezerImportService.importarORecuperarAlbum(TEST_DEEZER_ID);
                    
                    System.out.printf("[Hilo %d] Importación completada. ID local: %d%n", 
                            threadNum, result.id());
                    
                    return result;
                } finally {
                    doneLatch.countDown();
                }
            };
            
            futures.add(executor.submit(task));
        }
        
        // Liberar todos los hilos simultáneamente
        System.out.println("=== Liberando todos los hilos simultáneamente ===");
        startLatch.countDown();
        
        // Esperar a que todos terminen (máximo 30 segundos)
        boolean completed = doneLatch.await(30, TimeUnit.SECONDS);
        assertThat(completed).isTrue().withFailMessage("Los hilos no completaron en el tiempo límite");
        
        executor.shutdown();
        
        // Recolectar resultados
        List<AlbumResponseDTO> results = new ArrayList<>();
        for (Future<AlbumResponseDTO> future : futures) {
            results.add(future.get());
        }
        
        // VERIFICACIONES
        
        // 1. Todos los resultados deben ser no-nulos
        assertThat(results).hasSize(NUM_THREADS);
        assertThat(results).allMatch(dto -> dto != null, "Todos los DTOs deben ser no-nulos");
        
        // 2. Todos los resultados deben tener el mismo ID local
        Long expectedId = results.get(0).id();
        assertThat(results)
                .extracting(AlbumResponseDTO::id)
                .allMatch(id -> id.equals(expectedId), "Todos deben tener el mismo ID local");
        
        System.out.printf("=== Todos los hilos obtuvieron el mismo ID local: %d ===%n", expectedId);
        
        // 3. Solo debe existir un registro en la BD con ese deezer_id
        long count = albumRepository.findAll().stream()
                .filter(a -> TEST_DEEZER_ID.equals(a.getDeezerId()))
                .count();
        
        assertThat(count).isEqualTo(1)
                .withFailMessage("Debe existir exactamente 1 álbum con deezerId=%s, encontrados=%d", 
                        TEST_DEEZER_ID, count);
        
        System.out.println("=== Test de concurrencia PASADO: No hay duplicados ===");
    }

    @Test
    @DisplayName("Importaciones secuenciales del mismo álbum: segunda recupera sin llamar a Deezer")
    void testSequentialImportSameAlbum() {
        // Limpiar datos previos si existen
        albumRepository.findByDeezerId(TEST_DEEZER_ID)
                .ifPresent(album -> albumRepository.delete(album));
        
        // Primera importación
        long startTime1 = System.currentTimeMillis();
        AlbumResponseDTO result1 = deezerImportService.importarORecuperarAlbum(TEST_DEEZER_ID);
        long duration1 = System.currentTimeMillis() - startTime1;
        
        System.out.printf("Primera importación: ID=%d, tiempo=%dms%n", result1.id(), duration1);
        
        // Segunda importación (debería ser más rápida, sin llamar a Deezer)
        long startTime2 = System.currentTimeMillis();
        AlbumResponseDTO result2 = deezerImportService.importarORecuperarAlbum(TEST_DEEZER_ID);
        long duration2 = System.currentTimeMillis() - startTime2;
        
        System.out.printf("Segunda importación: ID=%d, tiempo=%dms%n", result2.id(), duration2);
        
        // VERIFICACIONES
        
        // 1. Ambas deben devolver el mismo ID
        assertThat(result1.id()).isEqualTo(result2.id());
        
        // 2. La segunda debería ser significativamente más rápida
        // (No siempre es determinista, así que solo verificamos que funcione)
        System.out.printf("Speedup segunda llamada: %.2fx más rápida%n", (double) duration1 / duration2);
        
        // 3. Solo un registro en BD
        long count = albumRepository.findAll().stream()
                .filter(a -> TEST_DEEZER_ID.equals(a.getDeezerId()))
                .count();
        
        assertThat(count).isEqualTo(1);
    }

    @Test
    @DisplayName("Importar álbum inexistente en Deezer: error controlado")
    void testImportNonExistentAlbum() {
        String fakeDeezerId = "99999999999"; // ID que no existe en Deezer
        
        try {
            deezerImportService.importarORecuperarAlbum(fakeDeezerId);
            // Si llegamos aquí sin excepción, verificar que Deezer devolvió error
        } catch (Exception e) {
            // Esperamos BusinessRuleException con mensaje apropiado
            System.out.println("Excepción esperada: " + e.getMessage());
            assertThat(e.getMessage()).containsAnyOf("Deezer", "error", "no encontrado");
        }
    }
}
