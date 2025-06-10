import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar.component';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../../components/footer.component';

@Component({
  selector: 'app-mentor-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent, FooterComponent],
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
  
  // Allowed choices for backend enums
  associationInterestChoices = [
    'yes', 'no', 'maybe', 'already_associated'
  ];
  sectors = [
    'blockchain', 'fmcg', 'saas', 'foodtech', 'edutech', 'fintech',
    'biotech', 'ecommerce', 'healthcare', 'consulting', 'agriculture', 'iot',
    'manufacturing', 'greentech', 'it', 'wearable', 'chemical', 'bigdata', 'social', 'logistics'
  ];
  
  stakeholderTypes = [
    { value: 'angel_investor', label: 'Angel Investor' },
    { value: 'startup_mentor', label: 'Startup Mentor' },
    { value: 'vc', label: 'VC' },
    { value: 'other', label: 'Other' }
  ];
  cities = [
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bengaluru', label: 'Bengaluru' },
    { value: 'ahmedabad', label: 'Ahmedabad' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'pune', label: 'Pune' },
    { value: 'other', label: 'Other' }
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
      full_name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      stakeholder_types: [[], Validators.required],
      other_stakeholder_type: [''],
      state: ['', Validators.required],
      organization_name: ['', Validators.required],
      association_interest: ['', Validators.required],
      linkedin_url: ['', [Validators.required, Validators.pattern('^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$')]]
    });
    this.mentorshipForm = this.fb.group({
      networking_cities: [[], Validators.required],
      other_networking_city: [''],
      preferred_sector_1: ['', Validators.required],
      preferred_sector_2: ['', Validators.required],
      preferred_sector_3: ['', Validators.required],
      mentor_any_sector: [false, Validators.required],
      join_mentorship_portal: [false, Validators.required],
      profile_image: [null],
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
        profile_image: file
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
        if (key === 'stakeholder_types' && Array.isArray(this.basicDetailsForm.value[key])) {
          formData.append(key, JSON.stringify(this.basicDetailsForm.value[key]));
        } else {
          formData.append(key, this.basicDetailsForm.value[key]);
        }
      });
      // Mentorship preferences
      Object.keys(this.mentorshipForm.value).forEach(key => {
        if (key === 'networking_cities' && Array.isArray(this.mentorshipForm.value[key])) {
          formData.append(key, JSON.stringify(this.mentorshipForm.value[key]));
        } else if (key === 'profile_image' && this.mentorshipForm.value[key]) {
          formData.append(key, this.mentorshipForm.value[key], this.mentorshipForm.value[key].name);
        } else {
          formData.append(key, this.mentorshipForm.value[key]);
        }
      });

      // Call API to register mentor
      this.authService.registerMentor(formData).subscribe(
        response => {
          this.isLoading = false;
          if (response.error) {
            this.errorMessage = response.error;
          } else {
            this.successMessage = 'Registration successful! Thank you for joining as a mentor.';
            // Redirect to confirmation page or dashboard if needed
          }
        },
        error => {
          this.isLoading = false;
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );
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
  
  // Checkbox handler for stakeholder_types
  onStakeholderTypeChange(type: string, event: any) {
    const arr = this.basicDetailsForm.get('stakeholder_types')?.value as string[];
    if (event.target.checked) {
      if (!arr.includes(type)) arr.push(type);
    } else {
      const idx = arr.indexOf(type);
      if (idx > -1) arr.splice(idx, 1);
    }
    this.basicDetailsForm.get('stakeholder_types')?.setValue([...arr]);
    this.basicDetailsForm.get('stakeholder_types')?.markAsTouched();
    if (arr.includes('other')) {
      this.basicDetailsForm.get('other_stakeholder_type')?.setValidators([Validators.required]);
    } else {
      this.basicDetailsForm.get('other_stakeholder_type')?.clearValidators();
      this.basicDetailsForm.get('other_stakeholder_type')?.setValue('');
    }
    this.basicDetailsForm.get('other_stakeholder_type')?.updateValueAndValidity();
  }
  // Checkbox handler for networking_cities
  onCityChange(city: string, event: any) {
    const arr = this.mentorshipForm.get('networking_cities')?.value as string[];
    if (event.target.checked) {
      if (!arr.includes(city)) arr.push(city);
    } else {
      const idx = arr.indexOf(city);
      if (idx > -1) arr.splice(idx, 1);
    }
    this.mentorshipForm.get('networking_cities')?.setValue([...arr]);
    this.mentorshipForm.get('networking_cities')?.markAsTouched();
    if (arr.includes('other')) {
      this.mentorshipForm.get('other_networking_city')?.setValidators([Validators.required]);
    } else {
      this.mentorshipForm.get('other_networking_city')?.clearValidators();
      this.mentorshipForm.get('other_networking_city')?.setValue('');
    }
    this.mentorshipForm.get('other_networking_city')?.updateValueAndValidity();
  }

  // Map display values to backend values for select/radio fields
  getAssociationInterestDisplay(val: string): string {
    switch (val) {
      case 'yes': return 'Yes';
      case 'no': return 'No';
      case 'maybe': return 'Maybe';
      case 'already_associated': return 'Already Associated with Eureka! 2024';
      default: return val;
    }
  }
  getSectorDisplay(val: string): string {
    switch (val) {
      case 'blockchain': return 'Blockchain / Deep Learning / Web3';
      case 'fmcg': return 'FMCG';
      case 'saas': return 'SaaS';
      case 'foodtech': return 'FoodTech';
      case 'edutech': return 'EduTech';
      case 'fintech': return 'FinTech';
      case 'biotech': return 'BioTech';
      case 'ecommerce': return 'E-Commerce';
      case 'healthcare': return 'Healthcare';
      case 'consulting': return 'Consulting';
      case 'agriculture': return 'Agriculture';
      case 'iot': return 'IoT';
      case 'manufacturing': return 'Manufacturing';
      case 'greentech': return 'GreenTech and Renewable Technology';
      case 'it': return 'IT';
      case 'wearable': return 'Wearable Tech';
      case 'chemical': return 'Chemical';
      case 'bigdata': return 'Big Data and Analysis';
      case 'social': return 'Social Startups';
      case 'logistics': return 'Logistics & Supply Chain';
      default: return val;
    }
  }
}