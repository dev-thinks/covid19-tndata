import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  getChartCaseData(dtName: string): Observable<any> {
    return this.http.get(environment.apiUrl + 'chartdata/cases?dtName=' + dtName);
  }

  getChartDeathData(dtName: string): Observable<any> {
    return this.http.get(environment.apiUrl + 'chartdata/death?dtName=' + dtName);
  }
}
