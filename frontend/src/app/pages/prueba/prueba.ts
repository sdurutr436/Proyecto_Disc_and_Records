import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StatCard } from '../../components/shared/stat-card/stat-card';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

/**
 * InfoComponent - Página de Información General
 *
 * Contiene tabs para:
 * - API de Desarrollo
 * - Sobre Nosotros
 * - Contacto
 * - Privacidad
 */

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, StatCard],
  templateUrl: './prueba.html',
  styleUrls: ['./prueba.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class PruebaComponent  {

}
