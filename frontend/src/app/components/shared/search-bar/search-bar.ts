import { Component, EventEmitter, Output, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBar {
  @Output() onSearch = new EventEmitter<string>();

  private router = inject(Router);
  searchTerm = signal<string>('');

  /**
   * Emitir evento de búsqueda al presionar Enter o hacer clic en el botón
   */
  handleSearch(): void {
    const term = this.searchTerm().trim();
    if (term) {
      this.onSearch.emit(term);
      // Navegar a la página de resultados
      this.router.navigate(['/search'], { queryParams: { q: term } });
    }
  }

  /**
   * Manejar tecla Enter en el input
   */
  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

  /**
   * Actualizar el término de búsqueda
   */
  updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  /**
   * Limpiar búsqueda
   */
  clearSearch(): void {
    this.searchTerm.set('');
    this.onSearch.emit('');
  }
}
