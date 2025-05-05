import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  constructor(private http:HttpClient) { }
  
  apiUrl= 'http://localhost:3000/api/events';


  getEvents(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

   

    return this.http.get<any>(this.apiUrl, { headers});
  }

  getEventById(eventId: number): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/${eventId}`, { headers });
  }

}
