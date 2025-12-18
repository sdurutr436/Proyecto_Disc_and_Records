import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbService } from '../../../services/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss'
})
export class Breadcrumb {
  private breadcrumbService = inject(BreadcrumbService);

  breadcrumbs = this.breadcrumbService.breadcrumbs;
  showBreadcrumbs = this.breadcrumbService.showBreadcrumbs;
}
