package com.discsandrecords.api.repositories;

import com.discsandrecords.api.entities.UsuarioCancion;
import com.discsandrecords.api.entities.UsuarioCancionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UsuarioCancionRepository extends JpaRepository<UsuarioCancion, UsuarioCancionId> {
    List<UsuarioCancion> findByUsuarioId(Long usuarioId);
    
    @Query("SELECT uc FROM UsuarioCancion uc WHERE uc.usuario.id = :usuarioId AND uc.textoResena IS NOT NULL ORDER BY uc.fechaResena DESC")
    List<UsuarioCancion> findResenasCancionesByUsuarioId(Long usuarioId);
}
