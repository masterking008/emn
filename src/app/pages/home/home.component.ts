import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar.component';
import { InfoSectionComponent } from '../../components/info-section.component';
import { KeyFunctionsComponent } from '../../components/key-functions.component';
import { MentorsConnectedComponent } from '../../components/mentors-connected.component';
import { MentorCardComponent } from '../../components/mentor-card.component';
import { FaqSectionComponent } from '../../components/faq-section.component';
import { FooterComponent } from '../../components/footer.component';
import { TestimonialCarouselComponent } from '../../components/testimonial-carousel.component';
import { HeroSectionComponent } from '../../components/hero-section.component';
import { HowToGetMentorComponent } from '../../components/how-to-get-mentor.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    InfoSectionComponent,
    KeyFunctionsComponent,
    HowToGetMentorComponent,
    MentorsConnectedComponent,
    MentorCardComponent,
    FaqSectionComponent,
    FooterComponent,
    TestimonialCarouselComponent,
    HeroSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
