import { Component } from '@angular/core';
import { EvenementService } from '../../services/evenement.service';
import { CommonModule } from '@angular/common';
import { Evenement } from '../../model/evenement.model';
import { Router } from '@angular/router';
import { EvenementFormComponent } from "../evenement-form/evenement-form.component";
import { NgxSplideModule } from 'ngx-splide';
import { MenuComponent } from "../../shared/menu/menu.component";
@Component({
  selector: 'app-evenement',
  imports: [CommonModule, EvenementFormComponent, NgxSplideModule, MenuComponent],
  templateUrl: './evenement.component.html',
  styleUrl: './evenement.component.css'
})

export class EvenementComponent {
  token = localStorage.getItem('token') || '';
  events:Evenement[] = [];
  showAddEventModal = false;
  selectedEvent:Evenement | null = null;
  selectedEventId: number | null = null;
  showConfirmationModal: boolean = false;

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
   
  }

  closeAddEventModal() {
    this.showAddEventModal = false;
    this.loadEvents();
 
  }

  editEvent(event: Evenement) {
    this.selectedEvent= event;
    this.showAddEventModal = true;
   
  }

      // Afficher la modal de confirmation
      confirmDelete(eventId: number): void {
        this.selectedEventId = eventId;
        this.showConfirmationModal = true;
      }
    
      // Annuler la suppression et fermer la modal
      cancelDelete(): void {
        this.showConfirmationModal = false;
        this.selectedEventId = null;
      }
      deleteConfirmed(): void {
        if (this.selectedEventId !== null) {
          this.evenementService.deleteEvent(this.selectedEventId).subscribe(
            (response) => {
              console.log(response.message); 
              this.loadEvents();
              this.showConfirmationModal = false;
              this.selectedEventId = null; 
            },
            (error) => {
              console.error('Erreur lors de la suppression de lévènement', error);
              
            }
          );
        }
      }

      splideOptions = {
        perPage: 4,
        type: 'loop',
        gap: '2rem',
        autoplay: true,
        breakpoints: {
          768: {
            perPage: 1, // mobile
          },
          1024: {
            perPage: 2, // tablette
          }
        }
      };
      
  
}
