import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

interface FAQ {
  question: string;
  answer: string;
  order: number;
  open?: boolean; // Added for UI state
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 section-light sharp">
      <div class="container mx-auto px-4">
        <h2 class="text-7xl md:text-9xl font-bold text-center mb-10 text-black">
          FAQS
        </h2>
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            *ngFor="let faq of faqs; let i = index"
            class="mb-4 border-2 border-black p-3 animate-fade-in"
            [style.animation-delay]="i * 200 + 'ms'"
          >
            <button
              (click)="toggleFaq(i)"
              class="w-full flex justify-between items-center py-4 text-left focus:outline-none transition-colors duration-300"
            >
              <span class="font-semibold text-xl md:text-2xl text-black pr-4">{{
                faq.question
              }}</span>
              <svg
                [ngClass]="{
                  'transform rotate-180': faq.open
                }"
                class="h-4 w-4 sm:h-5 sm:w-5 text-black flex-shrink-0 transition-transform duration-500 ease-in-out"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Animated Collapsible Panel -->
            <div
              class="overflow-hidden transition-all duration-500 ease-in-out"
              [ngStyle]="{
                'max-height': faq.open ? '500px' : '0px',
                opacity: faq.open ? '1' : '0',
                transform: faq.open
                  ? 'translateY(0) scale(1)'
                  : 'translateY(-10px) scale(0.95)'
              }"
            >
              <p class="text-black text-lg md:text-xl py-2 px-1">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class FaqSectionComponent {
  // Define FAQ interface based on Django model

  @Input() faqs: FAQ[] = []; // Will be populated from API

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getFAQs().subscribe((faqs: FAQ[]) => {
      this.faqs = faqs
        .map((faq) => ({
          ...faq,
          open: false, // Add UI state
        }))
        .sort((a, b) => a.order -b.order); // Sort by order descending to match Django model
    });
  }

  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
