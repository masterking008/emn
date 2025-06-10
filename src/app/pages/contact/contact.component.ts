import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar.component';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from '../../components/footer.component';
import { ContactCardComponent } from '../../components/contact-card.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule, 
    NavbarComponent, 
    FooterComponent,
    ContactCardComponent
  ],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  
  teamMembers = [
    {
      name: 'Rahul Sharma',
      position: 'Program Director',
      email: 'rahul@emn.com',
      phone: '+91 98765 43210',
      image: 'assets/team/rahul.jpg'
    },
    {
      name: 'Priya Patel',
      position: 'Mentor Relations',
      email: 'priya@emn.com',
      phone: '+91 87654 32109',
      image: 'assets/team/priya.jpg'
    },
    {
      name: 'Amit Kumar',
      position: 'Startup Coordinator',
      email: 'amit@emn.com',
      phone: '+91 76543 21098',
      image: 'assets/team/amit.jpg'
    },
    {
      name: 'Neha Singh',
      position: 'Events Manager',
      email: 'neha@emn.com',
      phone: '+91 65432 10987',
      image: 'assets/team/neha.jpg'
    }
  ];
  
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
  
  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;
    const formData = this.contactForm.value;
    this.http.post(`${environment.BASE_URL}/contact/`, formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.contactForm.reset();
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = true;
      }
    });
  }
}