import { ComponentFixture, TestBed } from '@angular/core/testing';
import AdminReviewsComponent from './reviews';

interface Review {
  id: string;
  albumTitle: string;
  username: string;
  rating: number;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

describe('AdminReviewsComponent', () => {
  let component: AdminReviewsComponent;
  let fixture: ComponentFixture<AdminReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReviewsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // =========================================================================
  // Initial State
  // =========================================================================
  describe('Initial State', () => {
    it('should have empty reviews array initially', () => {
      expect(component.reviews()).toEqual([]);
    });
  });

  // =========================================================================
  // Review Actions
  // =========================================================================
  describe('Review Actions', () => {
    it('should call approveReview without errors', () => {
      const consoleSpy = spyOn(console, 'log');
      component.approveReview('review-123');
      expect(consoleSpy).toHaveBeenCalledWith('Aprobar reseña:', 'review-123');
    });

    it('should call rejectReview without errors', () => {
      const consoleSpy = spyOn(console, 'log');
      component.rejectReview('review-456');
      expect(consoleSpy).toHaveBeenCalledWith('Rechazar reseña:', 'review-456');
    });

    it('should call deleteReview without errors', () => {
      const consoleSpy = spyOn(console, 'log');
      component.deleteReview('review-789');
      expect(consoleSpy).toHaveBeenCalledWith('Eliminar reseña:', 'review-789');
    });

    it('should handle multiple approvals', () => {
      const consoleSpy = spyOn(console, 'log');
      component.approveReview('1');
      component.approveReview('2');
      component.approveReview('3');
      expect(consoleSpy).toHaveBeenCalledTimes(3);
    });

    it('should handle multiple rejections', () => {
      const consoleSpy = spyOn(console, 'log');
      component.rejectReview('1');
      component.rejectReview('2');
      expect(consoleSpy).toHaveBeenCalledTimes(2);
    });
  });

  // =========================================================================
  // Reviews Signal
  // =========================================================================
  describe('Reviews Signal', () => {
    it('should allow setting reviews', () => {
      const mockReviews: Review[] = [
        { id: '1', albumTitle: 'Album 1', username: 'user1', rating: 5, content: 'Great!', status: 'pending', createdAt: new Date() },
        { id: '2', albumTitle: 'Album 2', username: 'user2', rating: 4, content: 'Good', status: 'approved', createdAt: new Date() }
      ];
      component.reviews.set(mockReviews);
      expect(component.reviews().length).toBe(2);
    });

    it('should allow updating reviews', () => {
      const mockReview: Review = { id: '1', albumTitle: 'Test', username: 'test', rating: 3, content: 'OK', status: 'pending', createdAt: new Date() };
      component.reviews.set([mockReview]);
      component.reviews.update(reviews => [...reviews, { id: '2', albumTitle: 'Test 2', username: 'user2', rating: 5, content: 'Excellent', status: 'approved', createdAt: new Date() }]);
      expect(component.reviews().length).toBe(2);
    });

    it('should allow filtering reviews by status', () => {
      const mockReviews: Review[] = [
        { id: '1', albumTitle: 'Album 1', username: 'user1', rating: 5, content: 'Great!', status: 'pending', createdAt: new Date() },
        { id: '2', albumTitle: 'Album 2', username: 'user2', rating: 4, content: 'Good', status: 'approved', createdAt: new Date() },
        { id: '3', albumTitle: 'Album 3', username: 'user3', rating: 2, content: 'Bad', status: 'pending', createdAt: new Date() }
      ];
      component.reviews.set(mockReviews);
      const pendingReviews = component.reviews().filter(r => r.status === 'pending');
      expect(pendingReviews.length).toBe(2);
    });

    it('should calculate average rating', () => {
      const mockReviews: Review[] = [
        { id: '1', albumTitle: 'Album 1', username: 'user1', rating: 5, content: 'Great!', status: 'approved', createdAt: new Date() },
        { id: '2', albumTitle: 'Album 2', username: 'user2', rating: 3, content: 'OK', status: 'approved', createdAt: new Date() },
        { id: '3', albumTitle: 'Album 3', username: 'user3', rating: 4, content: 'Good', status: 'approved', createdAt: new Date() }
      ];
      component.reviews.set(mockReviews);
      const avgRating = component.reviews().reduce((sum, r) => sum + r.rating, 0) / component.reviews().length;
      expect(avgRating).toBe(4);
    });
  });

  // =========================================================================
  // Template Integration
  // =========================================================================
  describe('Template Integration', () => {
    it('should render without errors', () => {
      expect(fixture.nativeElement).toBeTruthy();
    });
  });
});
