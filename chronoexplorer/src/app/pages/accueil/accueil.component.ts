import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from "../../shared/menu/menu.component";

@Component({
  selector: 'app-accueil',
  imports: [CommonModule, RouterModule, MenuComponent],
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
