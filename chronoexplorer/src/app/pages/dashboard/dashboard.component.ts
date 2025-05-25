import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Comment } from '../../model/comment.model';
import { CommentsService } from '../../services/comments.service';


@Component({
  selector: 'app-dashboard',
  imports: [RouterModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
})
export class DashboardComponent {
  

  showMobileSidebar = false;
  collapsed = false;

  toggleMobileSidebar() {
    this.showMobileSidebar = !this.showMobileSidebar;
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
