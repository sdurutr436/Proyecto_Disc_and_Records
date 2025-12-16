import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador: Confirmación de Contraseña
 * 
 * Cross-field validation a nivel FormGroup.
 * Valida que dos campos de contraseña tengan el mismo valor.
 * 
 * REQUISITOS:
 * - Los controles deben existir
 * - El control de confirmación debe haber sido tocado antes de mostrar error
 * - Los valores deben ser idénticos
 * 
 * RETORNA:
 * - null: contraseñas coinciden (válido)
 * - { mismatch: true }: no coinciden (inválido)
 * 
 * @param controlName - Nombre del control de contraseña original
 * @param matchControlName - Nombre del control de confirmación
 * 
 * @example
 * ```typescript
 * this.form = this.fb.group({
 *   password: ['', [Validators.required, passwordStrength()]],
 *   confirmPassword: ['', Validators.required]
 * }, { 
 *   validators: passwordMatch('password', 'confirmPassword')
 * });
 * ```
 */
export function passwordMatch(controlName: string, matchControlName: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(controlName);
    const matchControl = group.get(matchControlName);

    // Si alguno de los controles no existe, skip
    if (!control || !matchControl) return null;

    // Si el control de confirmación tiene errores pero no ha sido tocado, skip
    if (matchControl.errors && !matchControl.touched) return null;

    // Comparar valores
    return control.value === matchControl.value 
      ? null 
      : { mismatch: true };
  };
}

/**
 * Obtener mensaje amigable para error de no coincidencia
 * 
 * @returns Mensaje en español
 */
export function getPasswordMatchErrorMessage(): string {
  return 'Las contraseñas no coinciden';
}
