import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { API_ENDPOINTS } from '../config/api.config';
import { EstadisticasPlataforma } from '../models/data.models';

@Injectable({ providedIn: 'root' })
export class EstadisticasService extends BaseHttpService {

  getEstadisticas(): Observable<EstadisticasPlataforma> {
    return this.get<EstadisticasPlataforma>(API_ENDPOINTS.estadisticas.getAll);
  }
}
