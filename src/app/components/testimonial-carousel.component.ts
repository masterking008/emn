import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Testimonial } from '../services/api.service';

@Component({
  selector: 'app-testimonial-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="min-h-screen flex flex-col sharp">
      <!-- Tabs -->
      <div class="flex w-full">
        <button 
          (click)="activeTab = 'mentor'" 
          [ngClass]="{'bg-white text-black': activeTab === 'mentor', 'bg-black text-white': activeTab !== 'mentor'}"
          class="flex-1 py-4 text-center text-xl md:text-3xl font-bold transition-colors duration-300 sharp border-r border-gray-500">
          MENTOR TESTIMONIALS
        </button>
        <button 
          (click)="activeTab = 'startup'" 
          [ngClass]="{'bg-black text-white': activeTab === 'startup', 'bg-white text-black': activeTab !== 'startup'}"
          class="flex-1 py-4 text-center text-xl md:text-3xl font-bold transition-colors duration-300 sharp">
          STARTUP TESTIMONIALS
        </button>
      </div>

      <!-- Mentor Testimonials -->
      <div 
        *ngIf="activeTab === 'mentor'"
        class="flex-1 bg-white flex items-center justify-center relative overflow-hidden transition-all duration-500 ease-in-out"
        [ngClass]="{'opacity-100': activeTab === 'mentor', 'opacity-0': activeTab !== 'mentor'}">
        
        <div class="container mx-auto px-4 py-16 relative">
          <h2 class="text-7xl md:text-9xl font-bold text-center mb-12 text-black">WHAT OUR MENTORS SAY</h2>
          
          <div class="max-w-4xl mx-auto relative">
            <div 
              *ngFor="let testimonial of mentorTestimonials; let i = index" 
              class="transition-all duration-500 ease-in-out absolute w-full"
              [ngClass]="{'opacity-100 translate-x-0': currentMentorIndex === i, 'opacity-0 translate-x-full': currentMentorIndex < i, 'opacity-0 -translate-x-full': currentMentorIndex > i}">
              
              <div class="bg-white p-8 shadow-lg sharp border-2 border-black">
                <div class="flex items-center mb-6">
                  <img [src]="testimonial.profile_pic || 'https://randomuser.me/api/portraits/men/32.jpg'" alt="Profile" class="w-20 h-20 object-cover mr-6 sharp">
                  <div>
                    <h4 class="text-2xl md:text-4xl font-bold text-black mb-1">{{ testimonial.name }}</h4>
                    <p class="text-xl md:text-2xl text-gray-700">{{ testimonial.position }}</p>
                  </div>
                </div>
                <p class="text-xl md:text-3xl text-black italic">"{{ testimonial.message }}"</p>
              </div>
            </div>
            
            <!-- Navigation Arrows -->
            <button 
              (click)="prevMentor()" 
              class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-black text-white p-4 sharp hover:bg-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              (click)="nextMentor()" 
              class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-black text-white p-4 sharp hover:bg-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <!-- Indicators -->
            <div class="flex justify-center mt-8 space-x-2">
              <button 
                *ngFor="let _ of mentorTestimonials; let i = index" 
                (click)="currentMentorIndex = i"
                class="w-4 h-4 sharp transition-colors"
                [ngClass]="{'bg-black': currentMentorIndex === i, 'bg-gray-300': currentMentorIndex !== i}">
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Startup Testimonials -->
      <div 
        *ngIf="activeTab === 'startup'"
        class="flex-1 bg-black flex items-center justify-center relative overflow-hidden transition-all duration-500 ease-in-out"
        [ngClass]="{'opacity-100': activeTab === 'startup', 'opacity-0': activeTab !== 'startup'}">
        
        <div class="container mx-auto px-4 py-16 relative">
          <h2 class="text-7xl md:text-9xl font-bold text-center mb-12 text-white">WHAT OUR STARTUPS SAY</h2>
          
          <div class="max-w-4xl mx-auto relative">
            <div 
              *ngFor="let testimonial of startupTestimonials; let i = index" 
              class="transition-all duration-500 ease-in-out absolute w-full"
              [ngClass]="{'opacity-100 translate-x-0': currentStartupIndex === i, 'opacity-0 translate-x-full': currentStartupIndex < i, 'opacity-0 -translate-x-full': currentStartupIndex > i}">
              
              <div class="bg-black p-8 shadow-lg sharp border-2 border-white glass">
                <div class="flex items-center mb-6">
                  <img [src]="testimonial.profile_pic || 'https://randomuser.me/api/portraits/women/32.jpg'" alt="Profile" class="w-20 h-20 object-cover mr-6 sharp">
                  <div>
                    <h4 class="text-2xl md:text-4xl font-bold text-white mb-1">{{ testimonial.name }}</h4>
                    <p class="text-xl md:text-2xl text-gray-300">{{ testimonial.position }}</p>
                  </div>
                </div>
                <p class="text-xl md:text-3xl text-white italic">"{{ testimonial.message }}"</p>
              </div>
            </div>
            
            <!-- Navigation Arrows -->
            <button 
              (click)="prevStartup()" 
              class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-white text-black p-4 sharp hover:bg-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              (click)="nextStartup()" 
              class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-white text-black p-4 sharp hover:bg-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <!-- Indicators -->
            <div class="flex justify-center mt-8 space-x-2">
              <button 
                *ngFor="let _ of startupTestimonials; let i = index" 
                (click)="currentStartupIndex = i"
                class="w-4 h-4 sharp transition-colors"
                [ngClass]="{'bg-white': currentStartupIndex === i, 'bg-gray-700': currentStartupIndex !== i}">
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .glass {
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
  `]
})
export class TestimonialCarouselComponent implements OnInit, OnDestroy {
  activeTab: 'mentor' | 'startup' = 'mentor';
  currentMentorIndex = 0;
  currentStartupIndex = 0;
  autoRotateInterval: any;
  
  mentorTestimonials: Testimonial[] = [];
  startupTestimonials: Testimonial[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTestimonials();
    this.startAutoRotate();
  }

  ngOnDestroy(): void {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
  }

  loadTestimonials(): void {
    this.apiService.getTestimonials().subscribe({
      next: (data) => {
        this.mentorTestimonials = data.filter(t => t.role === 'mentor');
        this.startupTestimonials = data.filter(t => t.role === 'startup');
        
        // If no data from API, use fallback data
        if (this.mentorTestimonials.length === 0) {
          this.setFallbackMentorTestimonials();
        }
        if (this.startupTestimonials.length === 0) {
          this.setFallbackStartupTestimonials();
        }
      },
      error: (error) => {
        console.error('Error fetching testimonials:', error);
        this.setFallbackMentorTestimonials();
        this.setFallbackStartupTestimonials();
      }
    });
  }

  setFallbackMentorTestimonials(): void {
    this.mentorTestimonials = [
      {
        id: 1,
        name: 'John Smith',
        position: 'Senior Advisor, Tech Ventures',
        message: 'Being a mentor at EMN has been incredibly rewarding. The platform makes it easy to connect with promising startups and provide meaningful guidance that truly makes a difference.',
        profile_pic: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'mentor'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        position: 'CEO, Innovation Partners',
        message: "The quality of startups I've been able to work with through EMN is outstanding. The matching process ensures I can provide value where it's most needed.",
        profile_pic: 'https://randomuser.me/api/portraits/women/44.jpg',
        role: 'mentor'
      },
      {
        id: 3,
        name: 'Michael Chen',
        position: 'Angel Investor',
        message: "EMN has created a structured yet flexible mentorship framework that benefits both mentors and startups. I've seen remarkable growth in the companies I've mentored.",
        profile_pic: 'https://randomuser.me/api/portraits/men/67.jpg',
        role: 'mentor'
      }
    ];
  }

  setFallbackStartupTestimonials(): void {
    this.startupTestimonials = [
      {
        id: 4,
        name: 'Priya Desai',
        position: 'Founder, TechSolve',
        message: 'The mentorship we received through EMN was transformative for our business. Our mentor provided insights that helped us pivot our strategy and secure our next round of funding.',
        profile_pic: 'https://randomuser.me/api/portraits/women/28.jpg',
        role: 'startup'
      },
      {
        id: 5,
        name: 'Alex Rivera',
        position: 'CTO, GreenTech Solutions',
        message: 'Having access to industry veterans through EMN gave us the competitive edge we needed. The personalized guidance helped us navigate complex challenges with confidence.',
        profile_pic: 'https://randomuser.me/api/portraits/men/22.jpg',
        role: 'startup'
      },
      {
        id: 6,
        name: 'Zara Khan',
        position: 'Co-founder, HealthAI',
        message: 'EMN connected us with the perfect mentor who understood our industry and vision. Their support was instrumental in refining our product and go-to-market strategy.',
        profile_pic: 'https://randomuser.me/api/portraits/women/65.jpg',
        role: 'startup'
      }
    ];
  }

  startAutoRotate(): void {
    this.autoRotateInterval = setInterval(() => {
      if (this.activeTab === 'mentor') {
        this.nextMentor();
      } else {
        this.nextStartup();
      }
    }, 8000);
  }

  nextMentor(): void {
    this.currentMentorIndex = (this.currentMentorIndex + 1) % this.mentorTestimonials.length;
  }

  prevMentor(): void {
    this.currentMentorIndex = (this.currentMentorIndex - 1 + this.mentorTestimonials.length) % this.mentorTestimonials.length;
  }

  nextStartup(): void {
    this.currentStartupIndex = (this.currentStartupIndex + 1) % this.startupTestimonials.length;
  }

  prevStartup(): void {
    this.currentStartupIndex = (this.currentStartupIndex - 1 + this.startupTestimonials.length) % this.startupTestimonials.length;
  }
}