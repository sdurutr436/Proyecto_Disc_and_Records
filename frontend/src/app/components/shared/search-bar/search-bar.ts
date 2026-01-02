import { Component, EventEmitter, Output, signal } from '@angular/core';
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

  searchTerm = signal<string>('');

  /**
   * Emitir evento de búsqueda al presionar Enter o hacer clic en el botón
   */
  handleSearch(): void {
    const term = this.searchTerm().trim();
    if (term) {
      this.onSearch.emit(term);
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
