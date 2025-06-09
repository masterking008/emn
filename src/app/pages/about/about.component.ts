import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  team = [
    {
      name: 'Alex Johnson',
      position: 'CEO & Founder',
      bio: 'With over 15 years of industry experience, Alex has led EMN from a small startup to an industry leader.',
      image: 'assets/team/alex.jpg'
    },
    {
      name: 'Maria Rodriguez',
      position: 'CTO',
      bio: 'Maria brings technical expertise and innovation to our solutions, ensuring we stay at the cutting edge of technology.',
      image: 'assets/team/maria.jpg'
    },
    {
      name: 'David Chen',
      position: 'Head of Operations',
      bio: 'David ensures that our processes run smoothly and efficiently, delivering exceptional results to our clients.',
      image: 'assets/team/david.jpg'
    },
    {
      name: 'Sarah Williams',
      position: 'Customer Success Manager',
      bio: 'Sarah works closely with our clients to ensure they get the most value from our solutions and services.',
      image: 'assets/team/sarah.jpg'
    }
  ];

  contactInfo = [
    {
      title: 'Main Office',
      address: '123 Business Avenue, New York, NY 10001',
      phone: '(555) 123-4567',
      email: 'info@emn.com',
      hours: 'Monday-Friday: 9AM-6PM'
    },
    {
      title: 'Support',
      address: '',
      phone: '(555) 987-6543',
      email: 'support@emn.com',
      hours: '24/7 Support Available'
    },
    {
      title: 'Sales',
      address: '',
      phone: '(555) 456-7890',
      email: 'sales@emn.com',
      hours: 'Monday-Friday: 8AM-8PM'
    }
  ];
}