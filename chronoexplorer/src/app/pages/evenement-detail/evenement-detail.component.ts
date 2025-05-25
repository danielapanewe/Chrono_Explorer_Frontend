import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvenementService } from '../../services/evenement.service';
import { Evenement } from '../../model/evenement.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../model/comment.model';

@Component({
  selector: 'app-evenement-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './evenement-detail.component.html',
  styleUrl: './evenement-detail.component.css'
})
export class EvenementDetailComponent {

  event: Evenement | null = null;
  isLoading = false;
  errorMessage = '';
  content: string = '';
  comments: Comment[] = [];
  isFavori = false;
 // comments: any[] | undefined ;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EvenementService
  ) {}

  ngOnInit(): void {
    const eventIds = Number(this.route.snapshot.paramMap.get('id') || '0');
    this.loadEvent();
    this.getComments();
    this.eventService.getFavorites().subscribe({
      next: (favorites:  Evenement[]) => {
        this.isFavori = favorites.some(fav => fav.id === eventIds);
        console.log(favorites)
      },
      error: () => {
        this.isFavori = false;
      }
    });
    
  }
  loadEvent(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'event ID is missing';
      this.isLoading = false;
      return;
    }

    this.eventService.getEventById(+id).subscribe({
      next: (event) => {
        this.event = event;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load event details';
        this.isLoading = false;
      }
    });
  }

  submitComment() {
   const userids = Number(localStorage.getItem('userid') || '');
   const eventIds = Number(this.route.snapshot.paramMap.get('id') || '0');

  
   const comments: Comment = {
    id:0,
     event_id: eventIds,
     content: this.content,
     user_id: userids,
     isApproved: false,
     User: {
       id: 0,
       username: '',
       email: ''
     }
   };
   ;
  
    this.eventService.postComment(comments).subscribe({next: () => {
        console.log('Commentaire ajouté !');
        this.content = ''; // Réinitialise le champ
      },
      error: (err) => console.error('Erreur:', err)
    });
     /* this.comments.unshift(newComment); // ajouter au début de la liste
      this.comment.content = '';
      console.log(eventIds)*/
  }

  getComments() {
    const eventIds = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getCommentsByEventId(eventIds).subscribe(data => {
      this.comments = data;
      console.log('Commentaires reçus :', data); 
    });
  }


  toggleFavori() {
    const evenementId = Number(this.route.snapshot.paramMap.get('id'));
    const userId = Number(localStorage.getItem('userid') || '');
    this.isFavori = !this.isFavori;

    if (this.isFavori) {
      this.eventService
        .ajouterFavori(userId, evenementId)
        .subscribe((res) => {
          console.log(res);
          this.isFavori=true;
          console.log('Ajouté aux favoris');
        });
    } else {
      this.eventService
        .retirerFavori(userId, evenementId)
        .subscribe(() => {
          console.log('Retiré des favoris');
          this.isFavori=false;
        });
    }
  }

  

/*  this.eventService.getUserById().subscribe(user => {
    this.userId = user.id; // ou user._id selon ta base
  });*/
}
