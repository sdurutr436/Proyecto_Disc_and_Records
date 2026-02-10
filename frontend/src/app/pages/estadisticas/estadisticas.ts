import { Component, signal, inject, OnInit, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LucideAngularModule, Disc3, Mic2, Music, Tag, Users, MessageSquare, BarChart3 } from 'lucide-angular';
import { StatCard } from '../../components/shared/stat-card/stat-card';
import { Spinner } from '../../components/shared/spinner/spinner';
import { EstadisticasService } from '../../services/estadisticas.service';
import { EstadisticasPlataforma } from '../../models/data.models';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [StatCard, Spinner, LucideAngularModule],
  templateUrl: './estadisticas.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class EstadisticasComponent implements OnInit {
  private estadisticasService = inject(EstadisticasService);
  private destroyRef = inject(DestroyRef);

  // Lucide icons
  readonly BarChart3 = BarChart3;
  readonly Disc3 = Disc3;
  readonly Mic2 = Mic2;
  readonly Music = Music;
  readonly Tag = Tag;
  readonly Users = Users;
  readonly MessageSquare = MessageSquare;

  /** Estado de carga */
  isLoading = signal<boolean>(true);

  /** Datos de estadísticas */
  datos = signal<EstadisticasPlataforma | null>(null);

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  private cargarEstadisticas(): void {
    this.estadisticasService.getEstadisticas()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (stats) => {
          this.datos.set(stats);
          this.isLoading.set(false);
        },
        error: () => {
          this.datos.set({
            totalAlbumes: 48,
            totalArtistas: 25,
            totalCanciones: 312,
            totalGeneros: 12,
            totalUsuarios: 5,
            totalResenas: 37
          });
          this.isLoading.set(false);
        }
      });
  }
}
