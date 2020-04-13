import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GoogleAnalyticsService } from '../_services/google-analytics.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient, public googleAnalyticsService: GoogleAnalyticsService) { }

  getChartCaseData(dtName: string): Observable<any> {
    this.googleAnalyticsService.eventEmitter("getChartCaseData", "ChartService", dtName, 1);

    return this.http.get(environment.apiUrl + 'chartdata/cases?dtName=' + dtName);
  }

  getChartDeathData(dtName: string): Observable<any> {
    this.googleAnalyticsService.eventEmitter("getChartDeathData", "ChartService", dtName, 1);

    return this.http.get(environment.apiUrl + 'chartdata/death?dtName=' + dtName);
  }
}
