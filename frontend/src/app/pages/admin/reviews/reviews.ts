import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../../components/shared/button/button';
import { Alert } from '../../../components/shared/alert/alert';

interface Review {
  id: string;
  albumTitle: string;
  username: string;
  rating: number;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [CommonModule, Button, Alert],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss'
})
export default class AdminReviewsComponent {
  reviews = signal<Review[]>([]);

  approveReview(id: string): void {
    console.log('Aprobar reseña:', id);
    // TODO: Implementar lógica de aprobación
  }

  rejectReview(id: string): void {
    console.log('Rechazar reseña:', id);
    // TODO: Implementar lógica de rechazo
  }

  deleteReview(id: string): void {
    console.log('Eliminar reseña:', id);
    // TODO: Implementar lógica de eliminación
  }
}
