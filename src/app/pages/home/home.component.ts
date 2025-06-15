import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfoSectionComponent } from '../../components/info-section.component';
import { KeyFunctionsComponent } from '../../components/key-functions.component';
import { HowToGetMentorComponent } from '../../components/how-to-get-mentor.component';
import { MentorsConnectedComponent } from '../../components/mentors-connected.component';
import { FaqSectionComponent } from '../../components/faq-section.component';
import { FooterComponent } from '../../components/footer.component';
import { TestimonialCarouselComponent } from '../../components/testimonial-carousel.component';
import { ApiService, ConnectedMentor, FAQ } from '../../services/api.service';
import { HeroSectionComponent } from "../../components/hero-section.component";
import { NavbarComponent } from "../../components/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    InfoSectionComponent,
    KeyFunctionsComponent,
    HowToGetMentorComponent,
    MentorsConnectedComponent,
    FaqSectionComponent,
    FooterComponent,
    TestimonialCarouselComponent,
    HeroSectionComponent,
    NavbarComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentMentorIndex: number = 0;
  mentors: ConnectedMentor[] = [];
  faqs: FAQ[] = [];
  
  currentSlide: number = 0;
  carouselItems: Array<{title: string, description: string, image: string}> = [
    {
      title: 'Expert Mentorship',
      description: "Connect with industry veterans who provide strategic guidance tailored to your startup's needs.",
      image: 'assets/carousel/mentorship.jpg'
    },
    {
      title: 'Networking Opportunities', 
      description: 'Build valuable connections with other startups, mentors, and potential investors.',
      image: 'assets/carousel/networking.jpg'
    },
    {
      title: 'Resource Access',
      description: 'Gain access to exclusive resources, tools, and knowledge to accelerate your growth.',
      image: 'assets/carousel/resources.jpg'
    }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadMentors();
    this.loadFAQs();
  }

  loadMentors(): void {
    this.apiService.getConnectedMentors().subscribe({
      next: (data) => {
        this.mentors = data;
      },
      error: (error) => {
        console.error('Error fetching mentors:', error);
        // Fallback to sample data if API fails
        this.mentors = [
          {
            id: 1,
            name: 'Dr. Rajiv Sharma',
            designation: 'Senior Advisor',
            location: 'Mumbai, India',
            profile_pic: 'https://randomuser.me/api/portraits/men/32.jpg'
          },
          {
            id: 2,
            name: 'Priya Mehta',
            designation: 'CEO',
            location: 'Bangalore, India',
            profile_pic: 'https://randomuser.me/api/portraits/women/44.jpg'
          },
          {
            id: 3,
            name: 'Vikram Singh',
            designation: 'Investor',
            location: 'Delhi, India',
            profile_pic: 'https://randomuser.me/api/portraits/men/67.jpg'
          },
          {
            id: 4,
            name: 'Ananya Patel',
            designation: 'Founder',
            location: 'Hyderabad, India',
            profile_pic: 'https://randomuser.me/api/portraits/women/28.jpg'
          }
        ];
      }
    });
  }

  loadFAQs(): void {
    this.apiService.getFAQs().subscribe({
      next: (data) => {
        this.faqs = data.map(faq => ({...faq, open: false}));
      },
      error: (error) => {
        console.error('Error fetching FAQs:', error);
        // Fallback to sample data if API fails
        this.faqs = [
          {
            id: 1,
            question: 'How does the mentorship matching process work?',
            answer: 'Our platform uses a sophisticated algorithm to match startups with mentors based on industry, expertise, goals, and preferences. Both parties can review profiles before confirming the mentorship relationship.',
            order: 5,
            open: false
          },
          {
            id: 2,
            question: 'How long does a typical mentorship last?',
            answer: 'Mentorship durations are flexible and can range from short-term (1-3 months) to long-term (6-12 months) depending on the needs of the startup and availability of the mentor.',
            order: 4,
            open: false
          },
          {
            id: 3,
            question: 'Is there a cost associated with getting a mentor?',
            answer: 'The Eureka! Mentorship Network provides free mentorship as part of our commitment to fostering innovation and entrepreneurship in the ecosystem.',
            order: 3,
            open: false
          },
          {
            id: 4,
            question: 'Can I request a specific mentor?',
            answer: 'Yes, startups can browse mentor profiles and request specific mentors based on their expertise and background. The mentor will then review your request and decide if they can provide value to your startup.',
            order: 2,
            open: false
          },
          {
            id: 5,
            question: 'How often do mentorship sessions take place?',
            answer: "The frequency of sessions is determined by both the mentor and mentee, typically ranging from weekly to monthly meetings depending on the startup's needs and the mentor's availability.",
            order: 1,
            open: false
          }
        ];
      }
    });
  }

  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.carouselItems.length) % this.carouselItems.length;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.carouselItems.length;
  }

  setSlide(index: number): void {
    this.currentSlide = index;
  }
  
  // Mentor carousel methods
  getCurrentMentor(): ConnectedMentor {
    return this.mentors[this.currentMentorIndex];
  }
  
  getPrevMentor(): ConnectedMentor {
    const prevIndex = (this.currentMentorIndex - 1 + this.mentors.length) % this.mentors.length;
    return this.mentors[prevIndex];
  }
  
  getNextMentor(): ConnectedMentor {
    const nextIndex = (this.currentMentorIndex + 1) % this.mentors.length;
    return this.mentors[nextIndex];
  }
  
  prevMentor(): void {
    this.currentMentorIndex = (this.currentMentorIndex - 1 + this.mentors.length) % this.mentors.length;
  }
  
  nextMentor(): void {
    this.currentMentorIndex = (this.currentMentorIndex + 1) % this.mentors.length;
  }
  
  setCurrentMentorIndex(index: number): void {
    this.currentMentorIndex = index;
  }
}