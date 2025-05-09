import { Component } from '@angular/core';
import { EvenementService } from '../../services/evenement.service';
import { CommonModule } from '@angular/common';
import { Evenement } from '../../model/evenement.model';
import { Router } from '@angular/router';
import { EvenementFormComponent } from "../evenement-form/evenement-form.component";
@Component({
  selector: 'app-evenement',
  imports: [CommonModule, EvenementFormComponent],
  templateUrl: './evenement.component.html',
  styleUrl: './evenement.component.css'
})
export class EvenementComponent {
  token = localStorage.getItem('token') || '';
  events:Evenement[] = [];
  showAddEventModal = false;
  selectedEvent:Evenement | null = null;

constructor(private evenementService:EvenementService, private router: Router){}

ngOnInit() {
  this.loadEvents();
}

  loadEvents() {
    this.evenementService.getEvents( this.token).subscribe({
      next: res => {
        this.events = res;
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

  openAddEventModal() {
    this.showAddEventModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeAddEventModal() {
    this.showAddEventModal = false;
    this.loadEvents();
    document.body.style.overflow = 'auto';
  }

  editEvent(event: Evenement) {
    this.selectedEvent= event;
    this.showAddEventModal = true;
    document.body.style.overflow = 'hidden';
  }
  
}
