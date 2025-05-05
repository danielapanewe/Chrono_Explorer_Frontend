import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule,RouterModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen  = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
