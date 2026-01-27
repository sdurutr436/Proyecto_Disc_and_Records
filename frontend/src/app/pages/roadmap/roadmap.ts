import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Rocket } from 'lucide-angular';

/**
 * RoadmapComponent - Página de Próximamente/Roadmap
 *
 * Página vacía que mostrará el roadmap de desarrollo futuro.
 * Actualmente solo muestra las breadcrumbs para volver al inicio.
 */
@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './roadmap.html',
  styleUrls: ['./roadmap.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RoadmapComponent {
  // Lucide icons
  readonly Rocket = Rocket;
}
