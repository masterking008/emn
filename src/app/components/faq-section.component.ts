import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
              <span
                class="font-semibold text-xl md:text-2xl text-black pr-4"
                >{{ faq.question }}</span
              >
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
  faqs: Array<{ question: string; answer: string; open: boolean }> = [
    {
      question: 'How does the mentorship matching process work?',
      answer:
        'Our platform uses a sophisticated algorithm to match startups with mentors based on industry, expertise, goals, and preferences. Both parties can review profiles before confirming the mentorship relationship.',
      open: false,
    },
    {
      question: 'How long does a typical mentorship last?',
      answer:
        'Mentorship durations are flexible and can range from short-term (1-3 months) to long-term (6-12 months) depending on the needs of the startup and availability of the mentor.',
      open: false,
    },
    {
      question: 'Is there a cost associated with getting a mentor?',
      answer:
        'The Eureka! Mentorship Network provides free mentorship as part of our commitment to fostering innovation and entrepreneurship in the ecosystem.',
      open: false,
    },
    {
      question: 'Can I request a specific mentor?',
      answer:
        'Yes, startups can browse mentor profiles and request specific mentors based on their expertise and background. The mentor will then review your request and decide if they can provide value to your startup.',
      open: false,
    },
    {
      question: 'How often do mentorship sessions take place?',
      answer:
        "The frequency of sessions is determined by both the mentor and mentee, typically ranging from weekly to monthly meetings depending on the startup's needs and the mentor's availability.",
      open: false,
    },
  ];

  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
