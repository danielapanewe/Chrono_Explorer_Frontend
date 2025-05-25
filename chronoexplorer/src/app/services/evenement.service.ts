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

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`$http://localhost:3000/api/users/${userId}`);
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

  //commentaires

  postComment(comment: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:3000/api/comments`, comment,{ headers });
  }

  getCommentsByEventId(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/comments/event/${eventId}/comments`);
  }

  //Favoris
  ajouterFavori(userId: number, evenementId: number) {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:3000/api/events/${evenementId}/favorite`, {
      userId,
      evenementId,
    },{headers});
  }

  retirerFavori(userId: number, evenementId: number) {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`http://localhost:3000/api/events/${evenementId}/favorite`,{
      headers,
      body: {
        userId,
        evenementId
      }}
  );
  }

  getFavorites(): Observable<any[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`http://localhost:3000/api/events/test/favorites`,{headers});
  }

}
