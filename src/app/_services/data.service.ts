import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ContactInfo } from '../contact/contact-info';
import { GoogleAnalyticsService } from './google-analytics.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, public googleAnalyticsService: GoogleAnalyticsService) { }

  getStateData(): Observable<any> {
    this.googleAnalyticsService.eventEmitter("getStateData", "DataService", 'statedata', 1);

    return this.http.get(environment.apiUrl + 'statedata');
  }

  getGridData(): Observable<any> {
    this.googleAnalyticsService.eventEmitter("getGridData", "DataService", 'griddata', 1);

    return this.http.get(environment.apiUrl + 'griddata');
  }

  getGridSummaryData(dtName): Observable<any> {
    this.googleAnalyticsService.eventEmitter("getGridSummaryData", "DataService", dtName, 1);

    return this.http.get(environment.apiUrl + 'gridsummary?dtName=' + dtName);
  }

  addComments(contactInfo: ContactInfo): Observable<ContactInfo> {
    this.googleAnalyticsService.eventEmitter("addComments", "DataService", 'addcomment', 1);

    return this.http.post<ContactInfo>(environment.apiUrl + 'addcomment', contactInfo);
  }

}
