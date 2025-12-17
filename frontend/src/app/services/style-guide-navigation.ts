import { Injectable, signal } from '@angular/core';

export type StyleGuideSection = 'foundations' | 'atoms' | 'molecules' | 'organisms' | 'layout';

@Injectable({
  providedIn: 'root',
})
export class StyleGuideNavigationService {
  // Sección activa
  activeSection = signal<StyleGuideSection>('foundations');

  // Cambiar sección
  setSection(section: StyleGuideSection): void {
    this.activeSection.set(section);
  }
}
