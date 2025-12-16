package com.discsandrecords.api.repositories;

import com.discsandrecords.api.entities.UsuarioAlbum;
import com.discsandrecords.api.entities.UsuarioAlbumId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioAlbumRepository extends JpaRepository<UsuarioAlbum, UsuarioAlbumId> {
    List<UsuarioAlbum> findByUsuarioId(Long usuarioId);
    List<UsuarioAlbum> findByAlbumId(Long albumId);
    
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.usuario.id = :usuarioId AND ua.textoResena IS NOT NULL ORDER BY ua.fechaResena DESC")
    List<UsuarioAlbum> findResenasAlbumesByUsuarioId(@Param("usuarioId") Long usuarioId);
    
    long countByAlbumId(Long albumId);
    
    @Query("SELECT AVG(ua.puntuacion) FROM UsuarioAlbum ua WHERE ua.album.id = :albumId AND ua.puntuacion IS NOT NULL")
    Double calcularPuntuacionMedia(@Param("albumId") Long albumId);
}
