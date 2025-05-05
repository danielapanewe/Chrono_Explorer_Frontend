import { Component } from '@angular/core';
import { EvenementService } from '../../services/evenement.service';
import { CommonModule } from '@angular/common';
import { Evenement } from '../../model/evenement.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-evenement',
  imports: [CommonModule],
  templateUrl: './evenement.component.html',
  styleUrl: './evenement.component.css'
})
export class EvenementComponent {
  token = localStorage.getItem('token') || '';
  event:Evenement[] = [];

constructor(private evenementService:EvenementService, private router: Router){}

ngOnInit() {
  this.loadEvents();
}

  loadEvents() {
    this.evenementService.getEvents( this.token).subscribe({
      next: res => {
        this.event = res;
        console.log(res);
      },
      error: err => console.error(err)
    });
  }

  viewEventDetails(id?: number): void {
    if (id) {
      this.router.navigate(['/evenement', id]);
    }
  }
}
