import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EvenementService } from '../../services/evenement.service';
import { Evenement } from '../../model/evenement.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evenement-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './evenement-form.component.html',
  styleUrl: './evenement-form.component.css'
})
export class EvenementFormComponent {

  @Output() close = new EventEmitter<void>();
  @Input() eventToEdit: Evenement | null = null;
  
 
  title= '';
    date_start= '';
    date_end= '';
    location='';
    civilization= '';
    description= '';
    image_url= '';

    constructor(private eventService: EvenementService) {}
 
  



  ngOnChanges() {
    if (this.eventToEdit) {
      this.title = this.eventToEdit.title;
      this.date_start = this.eventToEdit.date_start;
      this.date_end = this.eventToEdit.date_end;
      this.location= this.eventToEdit.location;
      this.civilization = this.eventToEdit.civilization;
      this.description = this.eventToEdit.description;
      this.image_url = this.eventToEdit.image_url ;
      
     
      
    }
  }
  
  
  closeModal() {
    this.close.emit();
  }
  submitEvent() {
    const token = localStorage.getItem('token') || '';
    
    const evenement = {
      title: this.title,
      date_start: this.date_start,
      date_end: this.date_end,
      location:this.location,
      civilization: this.civilization,
      description: this.description,
      image_url: this.image_url,
     
    };
    if (this.eventToEdit) {
      this.eventService.updateEvent(this.eventToEdit.id, evenement, token).subscribe({
        next: (response) => {
          console.log('Réponse de l’API (modification) :', response);
          this.close.emit();
        },
        error: err => console.error(err)
        
      });
    } else{
      this.eventService.addEvent(evenement).subscribe({
        next: res => {
          console.log('Evenement ajouté :', res.message);
          this.close.emit();
          alert("L evenement a bien été ajouté")
          
        },
        error: err => {
          console.error('Erreur lors de l’ajout de l evenement :', err);
        }
      });
    }

   
  }
}
