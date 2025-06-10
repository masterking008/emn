import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mentors-connected',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-black">
      <div class="container mx-auto px-4">
        <h2 class="text-7xl md:text-9xl font-bold text-center mb-12 text-white">
          MENTORS CONNECTED WITH EMN
        </h2>

        <div class="flex items-center justify-center gap-8 relative">
          <!-- Left Arrow -->
          <button
            (click)="prevMentor()"
            class="text-white hover:text-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="square"
                stroke-linejoin="miter"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <!-- Mentor Cards -->
          <div class="flex items-center justify-center gap-8">
            <!-- Left Card (Smaller) -->
            <div
              class="transform transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div
                class="bg-black p-6 rounded-none border border-white shadow-lg"
                [ngClass]="{ 'opacity-70': true }"
              >
                <img
                  [src]="getPrevMentor().image"
                  alt="Mentor"
                  class="w-32 h-32 object-cover mx-auto mb-4 rounded-none"
                />
                <h4 class="text-xl font-bold text-white text-center">
                  {{ getPrevMentor().name }}
                </h4>
                <p class="text-gray-300 text-center">
                  {{ getPrevMentor().location }}
                </p>
              </div>
            </div>

            <!-- Center Card (Larger with glow) -->
            <div
              class="transform transition-all duration-300 hover:scale-105 cursor-pointer z-10"
            >
              <div
                class="bg-black p-8 rounded-none border-2 border-white shadow-lg"
                style="box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);"
              >
                <img
                  [src]="getCurrentMentor().image"
                  alt="Mentor"
                  class="w-48 h-48 object-cover mx-auto mb-4 rounded-none"
                />
                <h4 class="text-2xl font-bold text-white text-center">
                  {{ getCurrentMentor().name }}
                </h4>
                <p class="text-gray-300 text-center">
                  {{ getCurrentMentor().location }}
                </p>
              </div>
            </div>

            <!-- Right Card (Smaller) -->
            <div
              class="transform transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div
                class="bg-black p-6 rounded-none border border-white shadow-lg"
                [ngClass]="{ 'opacity-70': true }"
              >
                <img
                  [src]="getNextMentor().image"
                  alt="Mentor"
                  class="w-32 h-32 object-cover mx-auto mb-4 rounded-none"
                />
                <h4 class="text-xl font-bold text-white text-center">
                  {{ getNextMentor().name }}
                </h4>
                <p class="text-gray-300 text-center">
                  {{ getNextMentor().location }}
                </p>
              </div>
            </div>
          </div>

          <!-- Right Arrow -->
          <button
            (click)="nextMentor()"
            class="text-white hover:text-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="square"
                stroke-linejoin="miter"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <!-- Indicators -->
        <div class="flex justify-center mt-8 space-x-2">
          <button
            *ngFor="let mentor of mentors; let i = index"
            (click)="setCurrentMentorIndex(i)"
            class="w-3 h-3 rounded-none transition-colors"
            [ngClass]="{
              'bg-white': currentMentorIndex === i,
              'bg-gray-600': currentMentorIndex !== i
            }"
          ></button>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class MentorsConnectedComponent {

  mentors: Array<{name: string, location: string, image: string}> = [
    {
      name: 'Dr. Rajiv Sharma',
      location: 'Mumbai, India', 
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Priya Mehta',
      location: 'Bangalore, India',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Vikram Singh', 
      location: 'Delhi, India',
      image: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    {
      name: 'Ananya Patel',
      location: 'Hyderabad, India',
      image: 'https://randomuser.me/api/portraits/women/28.jpg'
    }
  ];

  currentMentorIndex: number = 0;

  currentSlide: number = 0;
  carouselItems: Array<{ title: string; description: string; image: string }> =
    [
      {
        title: 'Expert Mentorship',
        description:
          "Connect with industry veterans who provide strategic guidance tailored to your startup's needs.",
        image: 'assets/carousel/mentorship.jpg',
      },
      {
        title: 'Networking Opportunities',
        description:
          'Build valuable connections with other startups, mentors, and potential investors.',
        image: 'assets/carousel/networking.jpg',
      },
      {
        title: 'Resource Access',
        description:
          'Gain access to exclusive resources, tools, and knowledge to accelerate your growth.',
        image: 'assets/carousel/resources.jpg',
      },
    ];

  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.carouselItems.length) %
      this.carouselItems.length;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.carouselItems.length;
  }

  setSlide(index: number): void {
    this.currentSlide = index;
  }

  // Mentor carousel methods
  getCurrentMentor(): { name: string; location: string; image: string } {
    return this.mentors[this.currentMentorIndex];
  }

  getPrevMentor(): { name: string; location: string; image: string } {
    const prevIndex =
      (this.currentMentorIndex - 1 + this.mentors.length) % this.mentors.length;
    return this.mentors[prevIndex];
  }

  getNextMentor(): { name: string; location: string; image: string } {
    const nextIndex = (this.currentMentorIndex + 1) % this.mentors.length;
    return this.mentors[nextIndex];
  }

  prevMentor(): void {
    this.currentMentorIndex =
      (this.currentMentorIndex - 1 + this.mentors.length) % this.mentors.length;
  }

  nextMentor(): void {
    this.currentMentorIndex =
      (this.currentMentorIndex + 1) % this.mentors.length;
  }

  setCurrentMentorIndex(index: number): void {
    this.currentMentorIndex = index;
  }
}
