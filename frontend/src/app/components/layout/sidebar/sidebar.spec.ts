import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LUCIDE_ICONS, LucideIconProvider, Disc3, LayoutGrid, ArrowLeft, Search, Heart, Music, BarChart3, Star, MessageSquare, List, Users, Home, Settings, User, LogOut, TrendingUp, Clock, Headphones, Radio, Mic2, Award, Globe, Sparkles, Library, History, PlayCircle, Bookmark } from 'lucide-angular';

import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        {
          provide: LUCIDE_ICONS,
          multi: true,
          useValue: new LucideIconProvider({
            Disc3, LayoutGrid, ArrowLeft, Search, Heart, Music, BarChart3, Star,
            MessageSquare, List, Users, Home, Settings, User, LogOut, TrendingUp,
            Clock, Headphones, Radio, Mic2, Award, Globe, Sparkles, Library,
            History, PlayCircle, Bookmark
          })
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
