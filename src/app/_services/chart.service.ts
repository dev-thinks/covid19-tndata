import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  getChartCaseData(dtName: string): Observable<any> {
    return this.http.get('https://localhost:5001/api/map/chartdata/cases?dtName=' + dtName);
  }

  getChartDeathData(dtName: string): Observable<any> {
    return this.http.get('https://localhost:5001/api/map/chartdata/death?dtName=' + dtName);
  }
}
