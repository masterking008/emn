import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  currentStep = 1;
  totalSteps = 3;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  
  // Form for email verification (Step 1)
  emailForm: FormGroup;
  
  // Form for OTP verification (Step 2)
  otpForm: FormGroup;
  
  // Form for user details (Step 3)
  userForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
    
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }
  
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }
  
  // Step 1: Verify Email
  verifyEmail() {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    const email = this.emailForm.get('email')?.value;
    
    this.authService.verifyEmail(email).subscribe(
      response => {
        this.isLoading = false;
        if (response.error) {
          this.errorMessage = response.error;
        } else {
          this.successMessage = 'OTP sent to your email address';
          this.currentStep = 2;
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Failed to send OTP. Please try again.';
      }
    );
  }
  
  // Step 2: Verify OTP
  verifyOtp() {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    const email = this.emailForm.get('email')?.value;
    const otp = this.otpForm.get('otp')?.value;
    
    this.authService.verifyOtp(email, otp).subscribe(
      response => {
        this.isLoading = false;
        if (response.error) {
          this.errorMessage = response.error;
        } else {
          this.successMessage = 'Email verified successfully';
          this.currentStep = 3;
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Invalid OTP. Please try again.';
      }
    );
  }
  
  // Step 3: Complete Registration
  register() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    const userData = {
      email: this.emailForm.get('email')?.value,
      name: this.userForm.get('name')?.value,
      password: this.userForm.get('password')?.value
    };
    
    this.authService.register(userData).subscribe(
      response => {
        this.isLoading = false;
        if (response.error) {
          this.errorMessage = response.error;
        } else {
          this.successMessage = 'Registration successful! Redirecting to login...';
          // Redirect to login page after 2 seconds
          setTimeout(() => {
            // Navigate to login page
          }, 2000);
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }
  
  // Navigation between steps
  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.errorMessage = '';
      this.successMessage = '';
    }
  }
}