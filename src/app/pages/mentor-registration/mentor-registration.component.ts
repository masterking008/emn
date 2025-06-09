import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mentor-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './mentor-registration.component.html',
  styleUrls: ['./mentor-registration.component.css']
})
export class MentorRegistrationComponent {
  currentStep = 1;
  totalSteps = 3;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  
  // Form for email verification (Step 1)
  emailForm: FormGroup;
  
  // Form for basic details (Step 2)
  basicDetailsForm: FormGroup;
  
  // Form for mentorship preferences (Step 3)
  mentorshipForm: FormGroup;
  
  // Dropdown options
  states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 
    'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 
    'Lakshadweep', 'Puducherry'
  ];
  
  sectors = [
    'Blockchain / Deep Learning / Web3', 'FMCG', 'SaaS', 'FoodTech', 'EduTech', 'FinTech',
    'BioTech', 'E-Commerce', 'Healthcare', 'Consulting', 'Agriculture', 'IoT',
    'Manufacturing', 'GreenTech and Renewable Technology', 'IT', 'Wearable Tech',
    'Chemical', 'Big Data and Analysis', 'Social Startups', 'Logistics & Supply Chain'
  ];
  
  stakeholderTypes = [
    'Angel Investor', 'Startup Mentor', 'VC', 'Other'
  ];
  
  cities = [
    'Mumbai', 'Delhi', 'Bengaluru', 'Ahmedabad', 'Hyderabad', 'Pune', 'Other'
  ];
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
    
    this.basicDetailsForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      stakeholderType: [[], Validators.required],
      otherStakeholderType: [''],
      state: ['', Validators.required],
      organization: ['', Validators.required],
      associationInterest: ['', Validators.required],
      linkedinUrl: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
    });
    
    this.mentorshipForm = this.fb.group({
      offlineEventCities: [[], Validators.required],
      otherCity: [''],
      preferredSector1: ['', Validators.required],
      preferredSector2: ['', Validators.required],
      preferredSector3: ['', Validators.required],
      mentorAnySecctor: ['', Validators.required],
      joinPortal: ['', Validators.required],
      profileImage: [null],
      reference: ['']
    });
  }
  
  // Step 1: Verify Email
  verifyEmail() {
    if (this.emailForm.get('email')?.invalid) {
      this.emailForm.get('email')?.markAsTouched();
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
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Failed to send OTP. Please try again.';
      }
    );
  }
  
  // Step 1: Verify OTP
  verifyOtp() {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    const email = this.emailForm.get('email')?.value;
    const otp = this.emailForm.get('otp')?.value;
    
    this.authService.verifyOtp(email, otp).subscribe(
      response => {
        this.isLoading = false;
        if (response.error) {
          this.errorMessage = response.error;
        } else {
          this.successMessage = 'Email verified successfully';
          this.currentStep = 2;
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Invalid OTP. Please try again.';
      }
    );
  }
  
  // Handle file upload
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        this.errorMessage = 'File size should not exceed 10MB';
        return;
      }
      this.mentorshipForm.patchValue({
        profileImage: file
      });
    }
  }
  
  // Submit the form
  submitForm() {
    if (this.mentorshipForm.invalid) {
      this.mentorshipForm.markAllAsTouched();
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    // Combine all form data
    const formData = new FormData();
    formData.append('email', this.emailForm.get('email')?.value);
    
    // Basic details
    Object.keys(this.basicDetailsForm.value).forEach(key => {
      if (key === 'stakeholderType' && Array.isArray(this.basicDetailsForm.value[key])) {
        formData.append(key, JSON.stringify(this.basicDetailsForm.value[key]));
      } else {
        formData.append(key, this.basicDetailsForm.value[key]);
      }
    });
    
    // Mentorship preferences
    Object.keys(this.mentorshipForm.value).forEach(key => {
      if (key === 'offlineEventCities' && Array.isArray(this.mentorshipForm.value[key])) {
        formData.append(key, JSON.stringify(this.mentorshipForm.value[key]));
      } else if (key === 'profileImage' && this.mentorshipForm.value[key]) {
        formData.append(key, this.mentorshipForm.value[key], this.mentorshipForm.value[key].name);
      } else {
        formData.append(key, this.mentorshipForm.value[key]);
      }
    });
    
    // Call API to register mentor
    // This is a placeholder - you would need to implement the actual API call
    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = 'Registration successful! Thank you for joining as a mentor.';
      // Redirect to confirmation page or dashboard
    }, 2000);
  }
  
  // Navigation between steps
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      if (this.currentStep === 1 && this.emailForm.invalid) {
        this.emailForm.markAllAsTouched();
        return;
      }
      if (this.currentStep === 2 && this.basicDetailsForm.invalid) {
        this.basicDetailsForm.markAllAsTouched();
        return;
      }
      
      this.currentStep++;
      this.errorMessage = '';
      this.successMessage = '';
    }
  }
  
  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.errorMessage = '';
      this.successMessage = '';
    }
  }
}