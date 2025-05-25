import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  token = localStorage.getItem('token'); 
  constructor(private http:HttpClient) { }

   getComments(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
      return this.http.get<any[]>(`http://localhost:3000/api/comments`,{ headers });
    }

   // Valider un commentaire
   validateComment(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.put(`http://localhost:3000/api/comments/${id}/approve`, {}, { headers });
  }

    // Supprimer (refuser) un commentaire
    deleteComment(id: number): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
        
      return this.http.delete(`http://localhost:3000/api/comments/${id}`, { headers });
    }
}
