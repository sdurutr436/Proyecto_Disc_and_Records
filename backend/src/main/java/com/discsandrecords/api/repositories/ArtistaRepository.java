package com.discsandrecords.api.repositories;

import com.discsandrecords.api.entities.Artista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArtistaRepository extends JpaRepository<Artista, Long> {
    Optional<Artista> findByNombreArtista(String nombreArtista);
    Optional<Artista> findByNombreArtistaIgnoreCase(String nombreArtista);
    List<Artista> findByNombreArtistaContainingIgnoreCase(String nombre);
    boolean existsByNombreArtistaIgnoreCase(String nombreArtista);
}
