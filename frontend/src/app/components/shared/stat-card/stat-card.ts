import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './stat-card.html'
})


export class StatCard {
  /** Valor numérico a mostrar */
  @Input() valor: number = 0;

  /** Etiqueta descriptiva debajo del número */
  @Input() etiqueta: string = '';

  /** Icono de Lucide a mostrar */
  @Input() icono: any;
}
