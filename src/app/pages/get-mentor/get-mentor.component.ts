import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar.component';
import { FooterComponent } from '../../components/footer.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-get-mentor',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    FormsModule,
  ],
  templateUrl: './get-mentor.component.html',
  styleUrls: ['./get-mentor.component.css'],
})
export class GetMentorComponent {
  notifyEmail = '';
  isSubmitting = false;
  notifySuccess = false;
  notifyError = false;
  responseDetail = '';

  @ViewChild('notified') notified: any;

  constructor(private http: HttpClient) {}

  scrollToBottom() {
    const offset = -60; // adjust this negative value to scroll slightly *above* the element
    const top =
      this.notified.nativeElement.getBoundingClientRect().top +
      window.pageYOffset +
      offset;

    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }

  submitNotifyForm() {
    if (!this.notifyEmail) return;
    this.isSubmitting = true;
    this.notifySuccess = false;
    this.notifyError = false;
    this.http
      .post<{detail: string}>(`${environment.BASE_URL}/get-a-mentor-email/`, {
        email: this.notifyEmail,
        name: 'There' // Adding default name as per backend
      })
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.notifySuccess = true;
          this.notifyEmail = '';
          this.responseDetail = response.detail;
          console.log(response.detail);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.notifyError = true;
          // Will receive validation errors from serializer if any
          console.error('Error submitting form:', error);
        },
      });
    }
  }