import { ComponentFixture, TestBed } from '@angular/core/testing';
import AdminUsersComponent from './users';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

describe('AdminUsersComponent', () => {
  let component: AdminUsersComponent;
  let fixture: ComponentFixture<AdminUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUsersComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUsersComponent);
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
    it('should have empty users array initially', () => {
      expect(component.users()).toEqual([]);
    });
  });

  // =========================================================================
  // User Actions
  // =========================================================================
  describe('User Actions', () => {
    it('should call editUser without errors', () => {
      const consoleSpy = spyOn(console, 'log');
      component.editUser('user-123');
      expect(consoleSpy).toHaveBeenCalledWith('Editar usuario:', 'user-123');
    });

    it('should call deleteUser without errors', () => {
      const consoleSpy = spyOn(console, 'log');
      component.deleteUser('user-456');
      expect(consoleSpy).toHaveBeenCalledWith('Eliminar usuario:', 'user-456');
    });

    it('should handle editUser with different ids', () => {
      const consoleSpy = spyOn(console, 'log');
      component.editUser('1');
      component.editUser('2');
      component.editUser('admin');
      expect(consoleSpy).toHaveBeenCalledTimes(3);
    });

    it('should handle deleteUser with different ids', () => {
      const consoleSpy = spyOn(console, 'log');
      component.deleteUser('1');
      component.deleteUser('2');
      expect(consoleSpy).toHaveBeenCalledTimes(2);
    });
  });

  // =========================================================================
  // Users Signal
  // =========================================================================
  describe('Users Signal', () => {
    it('should allow setting users', () => {
      const mockUsers: User[] = [
        { id: '1', username: 'admin', email: 'admin@test.com', role: 'admin', createdAt: new Date() },
        { id: '2', username: 'user1', email: 'user1@test.com', role: 'user', createdAt: new Date() }
      ];
      component.users.set(mockUsers);
      expect(component.users().length).toBe(2);
    });

    it('should allow updating users', () => {
      const mockUser: User = { id: '1', username: 'test', email: 'test@test.com', role: 'user', createdAt: new Date() };
      component.users.set([mockUser]);
      component.users.update(users => [...users, { id: '2', username: 'test2', email: 'test2@test.com', role: 'admin', createdAt: new Date() }]);
      expect(component.users().length).toBe(2);
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
