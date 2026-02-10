package com.discsandrecords.api.repositories;

import org.springframework.stereotype.Repository;

import com.discsandrecords.api.dto.EstadisticasPlataformaDTO;

import jakarta.persistence.EntityManager;

@Repository
public class EstadisticasRepository {

    private final EntityManager entityManager;

    public EstadisticasRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public EstadisticasPlataformaDTO obtenerEstadisticas() {
        Object[] result = (Object[]) entityManager.createNativeQuery(
            "SELECT " +
            "(SELECT COUNT(*) FROM albumes), " +
            "(SELECT COUNT(*) FROM artistas), " +
            "(SELECT COUNT(*) FROM canciones), " +
            "(SELECT COUNT(*) FROM generos), " +
            "(SELECT COUNT(*) FROM usuarios), " +
            "(SELECT COUNT(*) FROM usuario_album)"
        ).getSingleResult();

        return new EstadisticasPlataformaDTO(
            ((Number) result[0]).longValue(),
            ((Number) result[1]).longValue(),
            ((Number) result[2]).longValue(),
            ((Number) result[3]).longValue(),
            ((Number) result[4]).longValue(),
            ((Number) result[5]).longValue()
        );
    }
}
