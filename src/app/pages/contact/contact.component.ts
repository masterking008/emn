import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar.component';
import { FooterComponent } from '../../components/footer.component';
import { ContactCardComponent } from '../../components/contact-card.component';
import { ApiService, ContactProfile } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    ContactCardComponent,
  ],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  teamMembers: ContactProfile[] = [];
  loading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.apiService.getContacts().subscribe({
      next: (data) => {
        this.teamMembers = data;
        this.loading = false;
        console.log('Contacts fetched successfully:', this.teamMembers);
      },
      error: (error) => {
        console.error('Error fetching contacts:', error);
        this.loading = false;
      },
    });
  }
}
