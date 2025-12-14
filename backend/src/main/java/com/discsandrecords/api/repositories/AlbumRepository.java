package com.discsandrecords.api.repositories;

import com.discsandrecords.api.entities.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    List<Album> findByArtistaId(Long artistaId);
    List<Album> findByTituloAlbumContainingIgnoreCase(String titulo);
}
