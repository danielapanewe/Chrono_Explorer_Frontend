import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvenementService } from '../../services/evenement.service';
import { Evenement } from '../../model/evenement.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evenement-detail',
  imports: [CommonModule],
  templateUrl: './evenement-detail.component.html',
  styleUrl: './evenement-detail.component.css'
})
export class EvenementDetailComponent {

  event: Evenement | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EvenementService
  ) {}

  ngOnInit(): void {
    this.loadContact();
  }
  loadContact(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'Contact ID is missing';
      this.isLoading = false;
      return;
    }

    this.eventService.getEventById(+id).subscribe({
      next: (event) => {
        this.event = event;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load contact details';
        this.isLoading = false;
      }
    });
  }
}
