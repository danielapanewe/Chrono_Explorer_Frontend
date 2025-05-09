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


  addEvent(event: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(this.apiUrl, event, { headers });
  }

  
  updateEvent(id: number, data: any, token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers });
  }

  deleteEvent(eventId: number): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/${eventId}`, { headers });
  }

}
