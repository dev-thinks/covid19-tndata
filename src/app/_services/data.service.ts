import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getStateData(): Observable<any> {
    return this.http.get('https://localhost:5001/api/map/statedata');
  }

  getGridData(): Observable<any> {
    return this.http.get('https://localhost:5001/api/map/griddata');
  }

}
