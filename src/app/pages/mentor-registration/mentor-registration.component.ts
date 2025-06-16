import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from '../../components/navbar.component';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../../components/footer.component';
import { OtpInputComponent } from '../../components/otp-input.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mentor-registration',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    OtpInputComponent,
  ],
  templateUrl: './mentor-registration.component.html',
  styleUrls: ['./mentor-registration.component.css'],
})
export class MentorRegistrationComponent implements OnInit {
  currentStep = 1;
  totalSteps = 3;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  otpSent = false;
  otpTimer = 60;
  otpTimerInterval: any;
  showResendButton = false;

  // Form for email verification (Step 1)
  emailForm: FormGroup;

  // Form for basic details (Step 2)
  basicDetailsForm: FormGroup;

  // Form for mentorship preferences (Step 3)
  mentorshipForm: FormGroup;

  // Dropdown options
  states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry',
  ];

  // Allowed choices for backend enums
  associationInterestChoices = ['yes', 'no', 'maybe', 'already_associated'];
  sectors = [
    'blockchain',
    'fmcg',
    'saas',
    'foodtech',
    'edutech',
    'fintech',
    'biotech',
    'ecommerce',
    'healthcare',
    'consulting',
    'agriculture',
    'iot',
    'manufacturing',
    'greentech',
    'it',
    'wearable',
    'chemical',
    'bigdata',
    'social',
    'logistics',
  ];

  // Available sectors for each dropdown
  availableSectors = {
    sector1: [...this.sectors],
    sector2: [...this.sectors],
    sector3: [...this.sectors],
  };

  stakeholderTypes = [
    { value: 'angel_investor', label: 'Angel Investor' },
    { value: 'startup_mentor', label: 'Startup Mentor' },
    { value: 'vc', label: 'VC' },
    { value: 'other', label: 'Other' },
  ];
  cities = [
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bengaluru', label: 'Bengaluru' },
    { value: 'ahmedabad', label: 'Ahmedabad' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'pune', label: 'Pune' },
    { value: 'other', label: 'Other' },
  ];

  ngOnInit() {
    // Check if there's saved form data in localStorage
    this.checkSavedFormData();

    // Initialize available sectors
    this.updateAvailableSectors();
  }

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
    this.basicDetailsForm = this.fb.group({
      full_name: ['', Validators.required],
      phone_number: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      stakeholder_types: [[], Validators.required],
      other_stakeholder_type: [''],
      state: ['', Validators.required],
      city: [''],
      organization_name: ['', Validators.required],
      association_interest: ['', Validators.required],
      linkedin_url: ['', [Validators.required]],
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
      reference: [''],
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
      (response) => {
        this.isLoading = false;
        if (response.error) {
          console.log('Validation errors:', response.error); // Debug log
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.error.email,
            background: '#333',
            color: '#fff',
            confirmButtonColor: '#fff',
            confirmButtonText: '<span class="text-black">OK</span>',
          });
          this.errorMessage = response.error.email;
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'OTP sent to your email address',
            background: '#333',
            color: '#fff',
            confirmButtonColor: '#fff',
            confirmButtonText: '<span class="text-black">OK</span>',
          });
          this.successMessage = 'OTP sent to your email address';
          this.otpSent = true;
          this.startOtpTimer();
        }
      },
      (error) => {
        this.isLoading = false;
        let errorMessage = 'Failed to send OTP. Please try again.';

        // console.log('Server validation errors:', error.error); // Debug log

        if (error.error && error.error.email && error.error.email.length > 0) {
          errorMessage = error.error.email[0];
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          background: '#333',
          color: '#fff',
          confirmButtonColor: '#fff',
          confirmButtonText: '<span class="text-black">OK</span>',
        });
        this.errorMessage = errorMessage;
      }
    );
  }

  // Handle OTP input change
  onOtpChange(otp: string) {
    this.emailForm.get('otp')?.setValue(otp);
    this.emailForm.get('otp')?.markAsTouched();
  }

  // Update available sectors based on current selections
  updateAvailableSectors() {
    // Reset all available sectors
    this.availableSectors = {
      sector1: [...this.sectors],
      sector2: [...this.sectors],
      sector3: [...this.sectors],
    };

    const sector1Value = this.mentorshipForm.get('preferred_sector_1')?.value;
    const sector2Value = this.mentorshipForm.get('preferred_sector_2')?.value;

    // Remove selected sectors from other dropdowns
    if (sector1Value) {
      this.availableSectors.sector2 = this.sectors.filter(
        (s) => s !== sector1Value
      );
      this.availableSectors.sector3 = this.sectors.filter(
        (s) => s !== sector1Value
      );

      // Reset sector2 if it's the same as sector1
      if (sector1Value === sector2Value) {
        this.mentorshipForm.get('preferred_sector_2')?.setValue('');
      }
    }

    if (sector2Value) {
      this.availableSectors.sector3 = this.availableSectors.sector3.filter(
        (s) => s !== sector2Value
      );

      // Reset sector3 if it's the same as sector2
      const sector3Value = this.mentorshipForm.get('preferred_sector_3')?.value;
      if (sector2Value === sector3Value) {
        this.mentorshipForm.get('preferred_sector_3')?.setValue('');
      }
    }
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
      (response) => {
        this.isLoading = false;
        if (response.error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.error,
            background: '#333',
            color: '#fff',
            confirmButtonColor: '#fff',
            confirmButtonText: '<span class="text-black">OK</span>',
          });
          this.errorMessage = response.error;
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Email verified successfully',
            background: '#333',
            color: '#fff',
            confirmButtonColor: '#fff',
            confirmButtonText: '<span class="text-black">OK</span>',
          });
          this.successMessage = 'Email verified successfully';
          this.stopOtpTimer();
          this.currentStep = 2;
          this.saveFormData();
        }
      },
      (error) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid OTP. Please try again.',
          background: '#333',
          color: '#fff',
          confirmButtonColor: '#fff',
          confirmButtonText: '<span class="text-black">OK</span>',
        });
        this.errorMessage = 'Invalid OTP. Please try again.';
      }
    );
  }

  profileImagePreview: string | null = null;
  profileImageName: string | null = null;
  imageUploading = false;

  // Handle file upload
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'File size should not exceed 10MB',
          background: '#333',
          color: '#fff',
          confirmButtonColor: '#fff',
          confirmButtonText: '<span class="text-black">OK</span>',
        });
        this.errorMessage = 'File size should not exceed 10MB';
        return;
      }

      this.imageUploading = true;
      this.profileImageName = file.name;

      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImagePreview = e.target.result;
        this.mentorshipForm.patchValue({
          profile_image: file,
        });
        this.saveFormData();
        this.imageUploading = false;
      };
      reader.readAsDataURL(file);
    }
  }
  formSubmitted = false;

  // Submit the form
  submitForm() {
    this.formSubmitted = true;

    if (this.mentorshipForm.invalid) {
      return;
    }

    if (!this.profileImagePreview) {
      Swal.fire({
        icon: 'error',
        title: 'Profile Image Required',
        text: 'Please upload your profile image to complete registration.',
        confirmButtonText: 'OK',
      });
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Combine all form data
    const formData = new FormData();
    formData.append('email', this.emailForm.get('email')?.value);

    // Basic details
    Object.keys(this.basicDetailsForm.value).forEach((key) => {
      if (
        key === 'stakeholder_types' &&
        Array.isArray(this.basicDetailsForm.value[key])
      ) {
        formData.append(key, JSON.stringify(this.basicDetailsForm.value[key]));
      } else {
        formData.append(key, this.basicDetailsForm.value[key]);
      }
    });
    // Mentorship preferences
    Object.keys(this.mentorshipForm.value).forEach((key) => {
      if (
        key === 'networking_cities' &&
        Array.isArray(this.mentorshipForm.value[key])
      ) {
        formData.append(key, JSON.stringify(this.mentorshipForm.value[key]));
      } else if (key === 'profile_image' && this.mentorshipForm.value[key]) {
        formData.append(
          key,
          this.mentorshipForm.value[key],
          this.mentorshipForm.value[key].name
        );
      } else {
        formData.append(key, this.mentorshipForm.value[key]);
      }
    });

    // // Log FormData key-value pairs
    // for (const pair of formData.entries()) {
    //   console.log(pair[0] + ':', pair[1]);
    // }

    // Call API to register mentor
    this.authService.registerMentor(formData).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.error) {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: response.error,
            background: '#333',
            color: '#fff',
            confirmButtonColor: '#fff',
            confirmButtonText: '<span class="text-black">OK</span>',
          });
          this.errorMessage = response.error;
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'Thank you for joining as a mentor.',
            background: '#333',
            color: '#fff',
            confirmButtonColor: '#fff',
            confirmButtonText: '<span class="text-black">OK</span>',
          }).then(() => {
            // Clear form data from localStorage after successful submission
            localStorage.removeItem('mentorRegistrationData');
            // Reset all forms
            this.emailForm.reset();
            this.basicDetailsForm.reset();
            this.mentorshipForm.reset();
            this.currentStep = 1;
            this.otpSent = false;
            this.successMessage = '';
            this.errorMessage = '';
            // Redirect to home
            window.location.href = '/emn';
          });
          this.successMessage =
            'Registration successful! Thank you for joining as a mentor.';
        }
      },
      (error) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Registration failed. Please try again.',
          background: '#333',
          color: '#fff',
          confirmButtonColor: '#fff',
          confirmButtonText: '<span class="text-black">OK</span>',
        });
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }

  // Navigation between steps
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      if (this.currentStep === 1 && this.emailForm.invalid) {
        this.emailForm.markAllAsTouched();

        // Get specific error messages
        let errorMessages = [];
        if (this.emailForm.get('email')?.errors?.['required']) {
          errorMessages.push('Email is required');
        } else if (this.emailForm.get('email')?.errors?.['email']) {
          errorMessages.push('Please enter a valid email address');
        }

        if (this.emailForm.get('otp')?.errors?.['required']) {
          errorMessages.push('OTP is required');
        } else if (
          this.emailForm.get('otp')?.errors?.['minlength'] ||
          this.emailForm.get('otp')?.errors?.['maxlength']
        ) {
          errorMessages.push('OTP must be 6 digits');
        }

        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          html:
            errorMessages.length > 0
              ? errorMessages.map((msg) => `• ${msg}`).join('<br>')
              : 'Please complete all required fields correctly.',
          background: '#333',
          color: '#fff',
          confirmButtonColor: '#fff',
          confirmButtonText: '<span class="text-black">OK</span>',
        });
        return;
      }

      if (this.currentStep === 2 && this.basicDetailsForm.invalid) {
        this.basicDetailsForm.markAllAsTouched();

        // Get specific error messages
        let errorMessages = [];
        if (this.basicDetailsForm.get('full_name')?.errors?.['required']) {
          errorMessages.push('Full name is required');
        }

        if (this.basicDetailsForm.get('phone_number')?.errors?.['required']) {
          errorMessages.push('Phone number is required');
        } else if (
          this.basicDetailsForm.get('phone_number')?.errors?.['pattern']
        ) {
          errorMessages.push('Please enter a valid 10-digit phone number');
        }

        if (
          this.basicDetailsForm.get('stakeholder_types')?.errors?.['required']
        ) {
          errorMessages.push('Please select at least one stakeholder type');
        }

        if (this.basicDetailsForm.get('state')?.errors?.['required']) {
          errorMessages.push('State is required');
        }

        if (
          this.basicDetailsForm.get('organization_name')?.errors?.['required']
        ) {
          errorMessages.push('Organization name is required');
        }

        if (
          this.basicDetailsForm.get('association_interest')?.errors?.[
            'required'
          ]
        ) {
          errorMessages.push('Please select an association interest option');
        }

        if (this.basicDetailsForm.get('linkedin_url')?.errors?.['required']) {
          errorMessages.push('LinkedIn URL is required');
        } else if (
          this.basicDetailsForm.get('linkedin_url')?.errors?.['pattern']
        ) {
          errorMessages.push('Please enter a valid LinkedIn URL');
        }

        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          html:
            errorMessages.length > 0
              ? errorMessages.map((msg) => `• ${msg}`).join('<br>')
              : 'Please complete all required fields correctly.',
          background: '#333',
          color: '#fff',
          confirmButtonColor: '#fff',
          confirmButtonText: '<span class="text-black">OK</span>',
        });
        return;
      }

      this.currentStep++;
      this.errorMessage = '';
      this.successMessage = '';
      this.saveFormData();
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
  onStakeholderTypeChange(type: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const arr =
      (this.basicDetailsForm.get('stakeholder_types')?.value as string[]) || [];

    if (checkbox.checked) {
      if (!arr.includes(type)) arr.push(type);
    } else {
      const idx = arr.indexOf(type);
      if (idx > -1) arr.splice(idx, 1);
    }

    this.basicDetailsForm.get('stakeholder_types')?.setValue([...arr]);
    this.basicDetailsForm.get('stakeholder_types')?.markAsTouched();

    if (arr.includes('other')) {
      this.basicDetailsForm
        .get('other_stakeholder_type')
        ?.setValidators([Validators.required]);
    } else {
      this.basicDetailsForm.get('other_stakeholder_type')?.clearValidators();
      this.basicDetailsForm.get('other_stakeholder_type')?.setValue('');
    }

    this.basicDetailsForm
      .get('other_stakeholder_type')
      ?.updateValueAndValidity();
  }
  // Checkbox handler for networking_cities
  onCityChange(city: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const arr =
      (this.mentorshipForm.get('networking_cities')?.value as string[]) || [];

    if (checkbox.checked) {
      if (!arr.includes(city)) arr.push(city);
    } else {
      const idx = arr.indexOf(city);
      if (idx > -1) arr.splice(idx, 1);
    }

    this.mentorshipForm.get('networking_cities')?.setValue([...arr]);
    this.mentorshipForm.get('networking_cities')?.markAsTouched();

    if (arr.includes('other')) {
      this.mentorshipForm
        .get('other_networking_city')
        ?.setValidators([Validators.required]);
    } else {
      this.mentorshipForm.get('other_networking_city')?.clearValidators();
      this.mentorshipForm.get('other_networking_city')?.setValue('');
    }

    this.mentorshipForm.get('other_networking_city')?.updateValueAndValidity();
  }

  // Map display values to backend values for select/radio fields
  getAssociationInterestDisplay(val: string): string {
    switch (val) {
      case 'yes':
        return 'Yes';
      case 'no':
        return 'No';
      case 'maybe':
        return 'Maybe';
      case 'already_associated':
        return 'Already Associated with Eureka! 2024';
      default:
        return val;
    }
  }

  getSectorDisplay(val: string): string {
    switch (val) {
      case 'blockchain':
        return 'Blockchain / Deep Learning / Web3';
      case 'fmcg':
        return 'FMCG';
      case 'saas':
        return 'SaaS';
      case 'foodtech':
        return 'FoodTech';
      case 'edutech':
        return 'EduTech';
      case 'fintech':
        return 'FinTech';
      case 'biotech':
        return 'BioTech';
      case 'ecommerce':
        return 'E-Commerce';
      case 'healthcare':
        return 'Healthcare';
      case 'consulting':
        return 'Consulting';
      case 'agriculture':
        return 'Agriculture';
      case 'iot':
        return 'IoT';
      case 'manufacturing':
        return 'Manufacturing';
      case 'greentech':
        return 'GreenTech and Renewable Technology';
      case 'it':
        return 'IT';
      case 'wearable':
        return 'Wearable Tech';
      case 'chemical':
        return 'Chemical';
      case 'bigdata':
        return 'Big Data and Analysis';
      case 'social':
        return 'Social Startups';
      case 'logistics':
        return 'Logistics & Supply Chain';
      default:
        return val;
    }
  }

  // OTP Timer functions
  startOtpTimer() {
    this.stopOtpTimer(); // Clear any existing timer
    this.otpTimer = 60;
    this.showResendButton = false;

    this.otpTimerInterval = setInterval(() => {
      this.otpTimer--;
      if (this.otpTimer <= 0) {
        this.stopOtpTimer();
        this.showResendButton = true;
      }
    }, 1333);
  }

  stopOtpTimer() {
    if (this.otpTimerInterval) {
      clearInterval(this.otpTimerInterval);
      this.otpTimerInterval = null;
    }
  }

  resendOtp() {
    this.verifyEmail();
  }

  // Form data persistence functions
  saveFormData() {
    const formData = {
      currentStep: this.currentStep,
      emailForm: this.emailForm.value,
      basicDetailsForm: this.basicDetailsForm.value,
      mentorshipForm: this.mentorshipForm.value,
    };
    localStorage.setItem('mentorRegistrationData', JSON.stringify(formData));
  }

  checkSavedFormData() {
    const savedData = localStorage.getItem('mentorRegistrationData');
    if (savedData) {
      Swal.fire({
        title: 'Restore Form Data?',
        text: 'We found your previously filled form data. Would you like to restore it?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, restore it',
        cancelButtonText: 'No, start fresh',
        background: '#333',
        color: '#fff',
        confirmButtonColor: '#000',
        cancelButtonColor: '#1e1e1e',
      }).then((result) => {
        if (result.isConfirmed) {
          this.restoreFormData(savedData);
        } else {
          localStorage.removeItem('mentorRegistrationData');
        }
      });
    }
  }

  restoreFormData(savedData: string) {
    try {
      const data = JSON.parse(savedData);

      // Restore current step
      this.currentStep = data.currentStep || 1;

      // Restore form values
      if (data.emailForm) {
        this.emailForm.patchValue(data.emailForm);
        if (data.emailForm.email && data.emailForm.otp) {
          this.otpSent = true;
        }
      }

      if (data.basicDetailsForm) {
        this.basicDetailsForm.patchValue(data.basicDetailsForm);

        // Handle stakeholder types separately since it's an array
        if (
          data.basicDetailsForm.stakeholder_types &&
          Array.isArray(data.basicDetailsForm.stakeholder_types)
        ) {
          this.basicDetailsForm
            .get('stakeholder_types')
            ?.setValue(data.basicDetailsForm.stakeholder_types);
        }
      }

      if (data.mentorshipForm) {
        this.mentorshipForm.patchValue(data.mentorshipForm);

        // Handle networking cities separately since it's an array
        if (
          data.mentorshipForm.networking_cities &&
          Array.isArray(data.mentorshipForm.networking_cities)
        ) {
          this.mentorshipForm
            .get('networking_cities')
            ?.setValue(data.mentorshipForm.networking_cities);
        }
      }
    } catch (error) {
      console.error('Error restoring form data:', error);
      localStorage.removeItem('mentorRegistrationData');
    }
  }
}
