package com.discsandrecords.api.exceptions;

/**
 * Excepción lanzada cuando se viola una regla de negocio.
 * Ejemplos: límite de reseñas excedido, operación no permitida, etc.
 */
public class BusinessRuleException extends RuntimeException {
    
    private final String ruleCode;

    public BusinessRuleException(String message) {
        super(message);
        this.ruleCode = "BUSINESS_RULE_VIOLATION";
    }

    public BusinessRuleException(String message, String ruleCode) {
        super(message);
        this.ruleCode = ruleCode;
    }

    public String getRuleCode() {
        return ruleCode;
    }
}
