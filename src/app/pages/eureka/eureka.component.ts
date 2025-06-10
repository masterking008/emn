import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartupCardComponent } from '../../components/startup-card.component';
import { NavbarComponent } from "../../components/navbar.component";
import { FooterComponent } from '../../components/footer.component';

@Component({
  selector: 'app-eureka',
  standalone: true,
  imports: [CommonModule, StartupCardComponent, NavbarComponent, FooterComponent],
  templateUrl: './eureka.component.html',
  styleUrls: ['./eureka.component.css']
})
export class EurekaComponent {
  startups = [
    {
      name: 'FinEdge',
      year: '2024',
      description: 'AI-powered financial planning for millennials.',
      logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
      website: 'https://finedge.com'
    },
    {
      name: 'AgroNext',
      year: '2023',
      description: 'Smart IoT solutions for sustainable agriculture.',
      logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
      website: 'https://agronext.com'
    },
    {
      name: 'MedConnect',
      year: '2022',
      description: 'Telemedicine platform connecting rural India.',
      logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
      website: 'https://medconnect.com'
    },
    {
      name: 'EcoCart',
      year: '2021',
      description: 'E-commerce for eco-friendly products.',
      logo: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
      website: 'https://ecocart.com'
    }
  ];
}