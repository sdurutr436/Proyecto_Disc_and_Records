import { Component, signal, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Tabs, Tab } from '../../components/shared/tabs/tabs';
import { LucideAngularModule, Wrench, Users, Mail, Twitter, Instagram, Lock } from 'lucide-angular';

type InfoTab = 'api' | 'about' | 'contact' | 'privacy';

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
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, Tabs, LucideAngularModule],
  templateUrl: './info.html',
  styleUrls: ['./info.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class InfoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Lucide icons
  readonly Wrench = Wrench;
  readonly Users = Users;
  readonly Mail = Mail;
  readonly Twitter = Twitter;
  readonly Instagram = Instagram;
  readonly Lock = Lock;

  /** Tab activo */
  activeTab = signal<InfoTab>('about');

  /** Configuración de tabs */
  tabs: Tab[] = [
    { id: 'api', label: 'API de Desarrollo' },
    { id: 'about', label: 'Sobre Nosotros' },
    { id: 'contact', label: 'Contacto' },
    { id: 'privacy', label: 'Privacidad' }
  ];

  ngOnInit(): void {
    // Leer tab de los query params
    this.route.queryParams.subscribe(params => {
      const tab = params['tab'] as InfoTab;
      if (tab && ['api', 'about', 'contact', 'privacy'].includes(tab)) {
        this.activeTab.set(tab);
      }
    });
  }

  /**
   * Cambiar tab activo
   */
  onTabChange(tabId: string | number): void {
    const tab = tabId as InfoTab;
    this.activeTab.set(tab);

    // Actualizar URL sin recargar
    this.router.navigate([], {
      queryParams: { tab },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }
}
