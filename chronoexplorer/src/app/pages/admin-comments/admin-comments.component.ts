import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { CommonModule, NgClass } from '@angular/common';
import { Comment } from '../../model/comment.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-comments',
  imports: [CommonModule, NgClass],
  templateUrl: './admin-comments.component.html',
  styleUrl: './admin-comments.component.css'
})
export class AdminCommentsComponent implements OnInit {
  commentaires: Comment[] = [];

  constructor(private commentService: CommentsService, private userService: AuthService) {}

  ngOnInit(): void {
    this.loadComment();
  }

  loadComment(){
    this.commentService.getComments().subscribe({
      next: (data) => {
console.log(data);
        data.forEach((comment) => {
          this.userService.getUserById(comment.user_id).subscribe({
            next: (user) => {
              comment.user_id = user.username; // on insère le nom de l’auteur
            },
            error: (err) =>
              console.error(`Erreur chargement utilisateur ${comment.userId}`, err),
          });
        });

        this.commentaires = data;
      },
      error: (err) => console.error('Erreur lors du chargement des commentaires', err)
    });
  }

  approveComment(id: number) {
    this.commentService.validateComment(id).subscribe({
      next: () => this.loadComment(), // Recharge la liste
      error: (err) => console.error('Erreur lors de la validation', err)
    });
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe({
      next: () => this.loadComment(), // Recharge la liste
      error: (err) => console.error('Erreur lors de la suppression', err)
    });
  }
}
