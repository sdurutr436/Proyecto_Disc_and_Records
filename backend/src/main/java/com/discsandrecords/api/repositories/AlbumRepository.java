package com.discsandrecords.api.repositories;

import com.discsandrecords.api.entities.Album;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    List<Album> findByArtistaId(Long artistaId);
    Page<Album> findByArtistaId(Long artistaId, Pageable pageable);
    List<Album> findByTituloAlbumContainingIgnoreCase(String titulo);
    long countByArtistaId(Long artistaId);
}
