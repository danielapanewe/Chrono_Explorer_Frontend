import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule,RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isMenuOpen = false;
  isProfileOpen = false;

  openMenu() {
    this.isMenuOpen  = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  openProfile() {
    this.isProfileOpen  = !this.isProfileOpen;
  }

 
}
