import { Component } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { NgxTimelineItem, NgxTimelineModule, NgxTimelineOrientation } from '@frxjs/ngx-timeline';
import { EvenementService } from '../../services/evenement.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-timeline',

  imports: [MenuComponent,NgxTimelineModule,CommonModule ],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {

  token = localStorage.getItem('token') || '';
  events: any[] = [];
  orientation = NgxTimelineOrientation.HORIZONTAL;
  eventss: NgxTimelineItem[] = [];

  constructor(private evenementService:EvenementService, private router: Router){}
  ngOnInit() {
    this.loadEvents();
  }

  getShortDescription(description: string, length: number = 100): string {
    return description.length > length ? description.slice(0, length) + '...' : description;
  }

  onEventClick(eventId: number): void {
    this.router.navigate(['/event', eventId]);
  }
  

  handleClick(event: any) {
    console.log('Événement cliqué:', event);
    alert(`Tu as cliqué sur : ${event.title}`);
    // Tu peux faire ce que tu veux avec l'événement cliqué ici
  }


  loadEvents() {
    this.evenementService.getEvents( this.token).subscribe({
      next: res => {
        console.log('Données reçues de l’API :', res);

        this.events = res.map((event: any) => ({
          timestamp: new Date(event.date_start),
          title: event.title,
          description: event.description.slice(0,event.description.length)
        }));
    
      },
      error: err => console.error(err)
    });
  }
}
