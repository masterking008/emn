import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  testimonials = [
    {
      id: 1,
      name: 'John Smith',
      position: 'CEO, TechCorp',
      image: 'assets/testimonials/person1.jpg',
      quote: 'Working with EMN has transformed our business operations. Their innovative solutions helped us increase efficiency by 40%.'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Marketing Director, GrowthLabs',
      image: 'assets/testimonials/person2.jpg',
      quote: 'The team at EMN delivered beyond our expectations. Their attention to detail and customer service is unmatched in the industry.'
    },
    {
      id: 3,
      name: 'Michael Chen',
      position: 'CTO, InnovateTech',
      image: 'assets/testimonials/person3.jpg',
      quote: 'EMN provided us with cutting-edge solutions that helped us stay ahead of our competition. Highly recommended!'
    }
  ];

  stats = [
    { value: '500+', label: 'Clients Worldwide' },
    { value: '98%', label: 'Customer Satisfaction' },
    { value: '15+', label: 'Years Experience' },
    { value: '24/7', label: 'Customer Support' }
  ];

  carouselItems = [
    {
      title: 'Innovative Solutions',
      description: 'Cutting-edge technology to drive your business forward',
      image: 'assets/carousel/slide1.jpg'
    },
    {
      title: 'Expert Consultation',
      description: 'Strategic guidance from industry professionals',
      image: 'assets/carousel/slide2.jpg'
    },
    {
      title: 'Reliable Support',
      description: 'Round-the-clock assistance for all your needs',
      image: 'assets/carousel/slide3.jpg'
    }
  ];

  currentSlide = 0;

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselItems.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.carouselItems.length) % this.carouselItems.length;
  }

  setSlide(index: number) {
    this.currentSlide = index;
  }
}