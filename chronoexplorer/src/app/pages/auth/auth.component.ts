import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [CommonModule,FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = 'user';
  createdUser: User | null = null;
  isLoginMode = true;

  constructor(private authservice:AuthService, private router:Router){}

  onSubmit() {
    if (this.isLoginMode){
      this.authservice.login(this.email, this.password).subscribe(
        (response) => {
          console.log('Réponse API:', response);
          localStorage.setItem('token', response.token); 
          localStorage.setItem('userid', response.user.id); 
          localStorage.setItem('role', response.user.role); 
          this.router.navigateByUrl("/accueil");
          
        },
        (error) => {
          console.error('Erreur lors de la connexion de l\'utilisateur :', error);
          
        }
      );
      
    }else{
      this.authservice.createUser(this.username, this.email, this.password, this.role).subscribe(
        (response) => {
          console.log('Utilisateur créé avec succès :', response);
          
          this.createdUser = response.user; 
          console.log(this.createdUser)
          localStorage.setItem('token', response.user.token); 
          localStorage.setItem('role', response.user.role); 
          this.isLoginMode=true;
          
          
        },
        (error) => {
          console.error('Erreur lors de la création de l\'utilisateur :', error);
         
        }
      );
    }
   

};
toggleMode() {
  this.isLoginMode = !this.isLoginMode;
}
}
