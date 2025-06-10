import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<section class=" hero relative bg-black text-white min-h-screen flex items-center justify-center shadow-2xl overflow-hidden sharp">

  <div class="container mx-auto px-4 z-10 flex flex-col items-center justify-center">
    <div class="flex flex-col items-center animate-fade-in">
      <!-- EMN Logo -->
      <img src="assets/emn-white.png" alt="EMN Logo" class="h-72 w-auto drop-shadow-lg object-contain" draggable="false"/>
      <div class="flex flex-wrap gap-4 justify-center">
        <a routerLink="/login" class="bg-white text-black hover:bg-gray-200 px-8 py-3 font-medium text-lg transition-colors shadow-lg sharp border border-white">LOGIN</a>
        <a routerLink="/become-mentor" class="bg-transparent border border-white hover:bg-white hover:text-black px-8 py-3 font-medium text-lg transition-colors shadow-lg sharp">BECOME A MENTOR</a>
      </div>
    </div>
  </div>
</section>


  `,
  styles: []
})
export class HeroSectionComponent {}