import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  name: string;
  position: string;
  quote: string;
  image?: string;
  type: 'mentor' | 'startup';
}

@Component({
  selector: 'app-testimonial-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="min-h-screen flex flex-col sharp bg-white">
      <!-- Tabs -->
      <h2 class="text-7xl md:text-9xl font-bold text-center text-black pt-12 pb-4" [ngClass]="{'bg-white text-black': activeTab === 'mentor', 'bg-black text-white': activeTab !== 'mentor'}">
        TESTIMONIALS
      </h2>

      <div class="flex w-full">
        <button 
          (click)="activeTab = 'mentor'" 
          [ngClass]="{'bg-white text-black': activeTab === 'mentor', 'bg-black text-white': activeTab !== 'mentor'}"
          class="flex-1 py-4 text-center text-xl md:text-3xl font-bold sharp border-r-2 border-gray-500 hover:bg-slate-100 hover:text-slate-900 transition-all duration-300 ease-in-out cursor-pointer" >
          MENTOR
        </button>
        <button 
          (click)="activeTab = 'startup'" 
          [ngClass]="{'bg-black text-white': activeTab === 'startup', 'bg-white text-black': activeTab !== 'startup'}"
       class="flex-1 py-4 text-center text-xl md:text-3xl font-bold sharp border-r-2 border-gray-500 hover:bg-slate-100 hover:text-slate-900 transition-all duration-300 ease-in-out cursor-pointer" >          STARTUP
        </button>
      </div>

      <!-- Mentor Testimonials -->
      <div 
        *ngIf="activeTab === 'mentor'"
        class="flex-1 min-h-[60vh] bg-white flex items-center relative overflow-hidden transition-all duration-500 ease-in-out"
        [ngClass]="{'opacity-100': activeTab === 'mentor', 'opacity-0': activeTab !== 'mentor'}">
        
        <div class="container mx-auto px-4 relative">
          <div class="min-h-[60vh] flex items-center max-w-4xl mx-auto relative">
            <div 
              *ngFor="let testimonial of mentorTestimonials; let i = index" 
              class="transition-all duration-500 ease-in-out absolute w-full px-4"
              [ngClass]="{
                'opacity-100 translate-x-0 z-10': currentMentorIndex === i,
                'opacity-0 translate-x-full z-0': currentMentorIndex < i,
                'opacity-0 -translate-x-full z-0': currentMentorIndex > i,
                'hidden': i === 0 && initialLoad
              }">
              
              <div class="bg-white p-8 shadow-lg sharp border-2 border-black">
                <div class="flex flex-col md:flex-row items-center mb-6">
                  <img [src]="testimonial.image || 'https://randomuser.me/api/portraits/men/32.jpg'" alt="Profile" class="w-20 h-20 object-cover mb-4 md:mb-0 md:mr-6 sharp">
                  <div class="text-center md:text-left">
                    <h4 class="text-2xl md:text-4xl font-bold text-black mb-1">{{ testimonial.name }}</h4>
                    <p class="text-xl md:text-2xl text-gray-700">{{ testimonial.position }}</p>
                  </div>
                </div>
                <p class="text-xl md:text-3xl text-black italic">"{{ testimonial.quote }}"</p>
              </div>
            </div>
            
            <!-- Navigation Arrows -->
            <button 
              (click)="prevMentor()" 
              class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-black text-white p-4 sharp hover:bg-gray-800 transition-colors z-40 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              (click)="nextMentor()" 
              class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-black text-white p-4 sharp hover:bg-gray-800 transition-colors z-40 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <!-- Indicators -->
          <div class="flex justify-center mt-8 space-x-2 pb-8">
            <button 
              *ngFor="let _ of mentorTestimonials; let i = index" 
              (click)="currentMentorIndex = i"
              class="w-4 h-4 sharp transition-colors z-40 cursor-pointer"
              [ngClass]="{'bg-black': currentMentorIndex === i, 'bg-gray-300': currentMentorIndex !== i}">
            </button>
          </div>
        </div>
      </div>

      <!-- Startup Testimonials -->
      <div 
        *ngIf="activeTab === 'startup'"
        class="flex-1 min-h-[60vh] bg-black flex items-center relative overflow-hidden transition-all duration-500 ease-in-out"
        [ngClass]="{'opacity-100': activeTab === 'startup', 'opacity-0': activeTab !== 'startup'}">
        
        <div class="container mx-auto px-4 relative">
          <div class="min-h-[60vh] flex items-center max-w-4xl mx-auto relative">
            <div 
              *ngFor="let testimonial of startupTestimonials; let i = index" 
              class="transition-all duration-500 ease-in-out absolute w-full px-4"
              [ngClass]="{
                'opacity-100 translate-x-0 z-10': currentStartupIndex === i,
                'opacity-0 translate-x-full z-0': currentStartupIndex < i,
                'opacity-0 -translate-x-full z-0': currentStartupIndex > i,
                'hidden': i === 0 && initialLoad
              }">
              
              <div class="bg-black p-8 shadow-lg sharp border-2 border-white glass">
                <div class="flex flex-col md:flex-row items-center mb-6">
                  <img [src]="testimonial.image || 'https://randomuser.me/api/portraits/women/32.jpg'" alt="Profile" class="w-20 h-20 object-cover mb-4 md:mb-0 md:mr-6 sharp">
                  <div class="text-center md:text-left">
                    <h4 class="text-2xl md:text-4xl font-bold text-white mb-1">{{ testimonial.name }}</h4>
                    <p class="text-xl md:text-2xl text-gray-300">{{ testimonial.position }}</p>
                  </div>
                </div>
                <p class="text-xl md:text-3xl text-white italic">"{{ testimonial.quote }}"</p>
              </div>
            </div>
            
            <!-- Navigation Arrows -->
            <button 
              (click)="prevStartup()" 
              class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-white text-black p-4 sharp hover:bg-gray-200 transition-colors z-40 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              (click)="nextStartup()" 
              class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-white text-black p-4 sharp hover:bg-gray-200 transition-colors z-40 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <!-- Indicators -->
          <div class="flex justify-center mt-8 space-x-2 pb-8">
            <button 
              *ngFor="let _ of startupTestimonials; let i = index" 
              (click)="currentStartupIndex = i"
              class="w-4 h-4 sharp transition-colors z-40 cursor-pointer"
              [ngClass]="{'bg-white': currentStartupIndex === i, 'bg-gray-700': currentStartupIndex !== i}">
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .sharp {
      border-radius: 0 !important;
    }
    .glass {
      backdrop-filter: blur(10px);
      background-color: rgba(0, 0, 0, 0.7);
    }
  `]
})
export class TestimonialCarouselComponent implements OnInit, OnDestroy {
  activeTab: 'mentor' | 'startup' = 'mentor';
  currentMentorIndex = 0;
  currentStartupIndex = 0;
  autoRotateInterval: any;
  initialLoad = true;
  
  mentorTestimonials: Testimonial[] = [
    {
      name: 'John Smith',
      position: 'Senior Advisor, Tech Ventures',
      quote: 'Being a mentor at EMN has been incredibly rewarding. The platform makes it easy to connect with promising startups and provide meaningful guidance that truly makes a difference.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      type: 'mentor'
    },
    {
      name: 'Sarah Johnson',
      position: 'CEO, Innovation Partners',
      quote: "The quality of startups I've been able to work with through EMN is outstanding. The matching process ensures I can provide value where it's most needed.",
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      type: 'mentor'
    },
    {
      name: 'Michael Chen',
      position: 'Angel Investor',
      quote: "EMN has created a structured yet flexible mentorship framework that benefits both mentors and startups. I've seen remarkable growth in the companies I've mentored.",
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
      type: 'mentor'
    }
  ];
  
  startupTestimonials: Testimonial[] = [
    {
      name: 'Priya Desai',
      position: 'Founder, TechSolve',
      quote: 'The mentorship we received through EMN was transformative for our business. Our mentor provided insights that helped us pivot our strategy and secure our next round of funding.',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      type: 'startup'
    },
    {
      name: 'Alex Rivera',
      position: 'CTO, GreenTech Solutions',
      quote: 'Having access to industry veterans through EMN gave us the competitive edge we needed. The personalized guidance helped us navigate complex challenges with confidence.',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      type: 'startup'
    },
    {
      name: 'Zara Khan',
      position: 'Co-founder, HealthAI',
      quote: 'EMN connected us with the perfect mentor who understood our industry and vision. Their support was instrumental in refining our product and go-to-market strategy.',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      type: 'startup'
    }
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.initialLoad = false;
    }, 50);
    this.startAutoRotate();
  }

  ngOnDestroy(): void {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
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