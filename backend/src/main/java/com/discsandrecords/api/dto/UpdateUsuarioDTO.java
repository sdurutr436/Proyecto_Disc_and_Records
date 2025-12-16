package com.discsandrecords.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UpdateUsuarioDTO(
    @Email(message = "El email debe ser válido")
    String mail,
    
    String avatar,
    
    @Size(max = 500, message = "La biografía no puede tener más de 500 caracteres")
    String biografia
) {}
