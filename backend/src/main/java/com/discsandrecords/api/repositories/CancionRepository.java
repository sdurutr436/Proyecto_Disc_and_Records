package com.discsandrecords.api.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.discsandrecords.api.entities.Cancion;

@Repository
public interface CancionRepository extends JpaRepository<Cancion, Long> {
    List<Cancion> findByArtistaId(Long artistaId);
    Page<Cancion> findByArtistaId(Long artistaId, Pageable pageable);
    List<Cancion> findByTituloCancionContainingIgnoreCase(String titulo);
}
