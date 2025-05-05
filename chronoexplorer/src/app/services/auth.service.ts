import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }


    createUser(username:string,email: string, password: string, role: string): Observable<any> {
      
      const body = {
        username,
        email,
        password,
        role
      };
      return this.http.post<any>("http://localhost:3000/api/auth/register", body);
    };

    login(email: string, password: string): Observable<any> {
    
      const body = {
        email,
        password,
        
      };
      return this.http.post<any>("http://localhost:3000/api/auth/login", body );
    }
  
}
