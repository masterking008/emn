import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-to-get-mentor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 section-dark sharp">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-7xl md:text-9xl font-bold text-center mb-10 text-white">HOW TO GET A MENTOR?</h2>
          <ng-content></ng-content>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .connecting-line {
      position: absolute;
      height: 4px;
      background-color: white;
      transform-origin: left center;
    }
  `]
})
export class HowToGetMentorComponent {}