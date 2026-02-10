import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class Footer {
  private router = inject(Router);

  /**
   * Navegar a la página principal
   */
  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToEstadisticas(): void {
    this.router.navigate(['/estadisticas']);
  }
}
