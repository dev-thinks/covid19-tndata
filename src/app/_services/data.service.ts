import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ContactInfo } from '../contact/contact-info';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getStateData(): Observable<any> {
    return this.http.get(environment.apiUrl + 'statedata');
  }

  getGridData(): Observable<any> {
    return this.http.get(environment.apiUrl + 'griddata');
  }

  addComments(contactInfo: ContactInfo): Observable<ContactInfo> {
    return this.http.post<ContactInfo>(environment.apiUrl + 'addcomment', contactInfo);
  }

}
