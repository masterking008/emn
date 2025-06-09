import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
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
  
  constructor(private fb: FormBuilder) {
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
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();
    }, 1500);
  }
}