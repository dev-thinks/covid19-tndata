import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GoogleAnalyticsService } from '../_services/google-analytics.service';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private http: HttpClient, public googleAnalyticsService: GoogleAnalyticsService) { }

  getStateShapes(): Observable<any> {
    this.googleAnalyticsService.eventEmitter("getStateShapes", "ShapeService", 'geojson', 1);

    return this.http.get(environment.apiUrl + 'getgeojson');
  }
}
