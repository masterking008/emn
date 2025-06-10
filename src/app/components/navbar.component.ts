import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<nav
  [ngClass]="{
    'glass-dark shadow-md': isScrolled,
    'bg-black': forceDarkBg,
    'bg-transparent': !isScrolled && !forceDarkBg
  }"
  class="fixed w-dvw z-50 sharp"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-20 ">
      <div class="flex items-center">
        <a routerLink="/" class="flex-shrink-0 flex items-center">
          <img class="h-12" src="assets/logo.webp" alt="EMN Logo" />
        </a>
      </div>

      <!-- Desktop menu -->
      <div
        class="hidden lg:flex items-center justify-center space-x-2 sm:space-x-4"
      >
        <a
          routerLink="/"
          routerLinkActive="text-white"
          [routerLinkActiveOptions]="{ exact: true }"
          class="px-2 sm:px-3 py-1 sm:py-2 text-md sm:text-md font-medium hover:text-gray-300 transition-colors sharp text-center"
          >HOME</a
        >
        <a
          routerLink="/about"
          routerLinkActive="text-white"
          class="px-2 sm:px-3 py-1 sm:py-2 text-md sm:text-md font-medium hover:text-gray-300 transition-colors sharp text-center"
          >ABOUT</a
        >
        <a
          routerLink="/become-mentor"
          routerLinkActive="text-white"
          class="px-2 sm:px-3 py-1 sm:py-2 text-md sm:text-md font-medium hover:text-gray-300 transition-colors sharp text-center"
          >BECOME A MENTOR</a
        >
        <a
          routerLink="/get-mentor"
          routerLinkActive="text-white"
          class="px-2 sm:px-3 py-1 sm:py-2 text-md sm:text-md font-medium hover:text-gray-300 transition-colors sharp text-center"
          >GET A MENTOR</a
        >
        <a
          routerLink="/eureka"
          routerLinkActive="text-white"
          class="px-2 sm:px-3 py-1 sm:py-2 text-md sm:text-md font-medium hover:text-gray-300 transition-colors sharp text-center"
          >EUREKA! STARTUPS</a
        >
        <a
          routerLink="/contact"
          routerLinkActive="text-white"
          class="px-2 sm:px-3 py-1 sm:py-2 text-md sm:text-md font-medium hover:text-gray-300 transition-colors sharp text-center"
          >CONTACT</a
        >
      </div>

      <!-- Authentication buttons -->
      <div class="hidden lg:flex items-center space-x-4">
        <button
          *ngIf="!authService.isLoggedIn()"
          routerLink="/login"
          class="bg-white text-black hover:bg-gray-200 px-3 sm:px-4 py-1 sm:py-2 text-md sm:text-md font-medium transition-colors sharp border border-white"
        >
          LOGIN
        </button>
        <button
          *ngIf="authService.isLoggedIn()"
          routerLink="/profile"
          class="bg-white text-black hover:bg-gray-200 px-3 sm:px-4 py-1 sm:py-2 text-md sm:text-md font-medium transition-colors sharp border border-white"
        >
          PROFILE
        </button>
      </div>

      <!-- Mobile menu button -->
      <div class="flex lg:hidden items-center">
        <button
          *ngIf="!authService.isLoggedIn()"
          routerLink="/login"
          class="bg-white text-black hover:bg-gray-200 px-3 sm:px-4 py-1 sm:py-2 text-md sm:text-md font-medium transition-colors sharp border border-white"
        >
          LOGIN
        </button>
        <button
          *ngIf="authService.isLoggedIn()"
          routerLink="/profile"
          class="bg-white text-black hover:bg-gray-200 px-3 sm:px-4 py-1 sm:py-2 text-md sm:text-md font-medium transition-colors sharp border border-white"
        >
          PROFILE
        </button>
        <button
          (click)="toggleMenu()"
          class="inline-flex items-center justify-center p-1 sm:p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
        >
          <svg
            *ngIf="!isMenuOpen"
            class="h-8 w-8 ml-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            *ngIf="isMenuOpen"
            class="h-8 w-8 ml-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  <div *ngIf="isMenuOpen" class="lg:hidden glass-dark shadow-lg sharp">
    <div class="px-2 pt-2 pb-3 space-y-1">
      <a
        routerLink="/"
        routerLinkActive="bg-white text-black"
        [routerLinkActiveOptions]="{ exact: true }"
        (click)="closeMenu()"
        class="block px-2 sm:px-3 py-1 sm:py-2 text-md sm:text-base font-medium hover:bg-white hover:text-black sharp text-center"
        >HOME</a
      >
      <a
        routerLink="/about"
        routerLinkActive="bg-white text-black"
        (click)="closeMenu()"
        class="block px-2 sm:px-3 py-1 sm:py-2 text-md sm:text-base font-medium hover:bg-white hover:text-black sharp text-center"
        >ABOUT</a
      >
      <a
        routerLink="/become-mentor"
        routerLinkActive="bg-white text-black"
        (click)="closeMenu()"
        class="block px-2 sm:px-3 py-1 sm:py-2 text-md sm:text-base font-medium hover:bg-white hover:text-black sharp text-center"
        >BECOME A MENTOR</a
      >
      <a
        routerLink="/get-mentor"
        routerLinkActive="bg-white text-black"
        (click)="closeMenu()"
        class="block px-2 sm:px-3 py-1 sm:py-2 text-md sm:text-base font-medium hover:bg-white hover:text-black sharp text-center"
        >GET A MENTOR</a
      >
      <a
        routerLink="/eureka"
        routerLinkActive="bg-white text-black"
        (click)="closeMenu()"
        class="block px-2 sm:px-3 py-1 sm:py-2 text-md sm:text-base font-medium hover:bg-white hover:text-black sharp text-center"
        >EUREKA! STARTUPS</a
      >
      <a
        routerLink="/contact"
        routerLinkActive="bg-white text-black"
        (click)="closeMenu()"
        class="block px-2 sm:px-3 py-1 sm:py-2 text-md sm:text-base font-medium hover:bg-white hover:text-black sharp text-center"
        >CONTACT</a
      >
    </div>
  </div>
</nav>
`,
  styles: []
})
export class NavbarComponent {
  isMenuOpen = false;
  isScrolled = false;
  @Input() forceDarkBg = false;

  constructor(public authService: AuthService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}