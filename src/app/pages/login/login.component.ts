import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar.component';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../../components/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isStartupLogin = true;
  isLoading = false;
  errorMessage = '';
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  toggleLoginType() {
    this.isStartupLogin = !this.isStartupLogin;
    this.errorMessage = '';
  }
  
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    
    this.authService.login(email, password).subscribe(
      response => {
        this.isLoading = false;
        if (response.error) {
          this.errorMessage = response.error;
        } else {
          // Navigate to appropriate dashboard based on user type
          if (this.isStartupLogin) {
            this.router.navigate(['/startup-dashboard']);
          } else {
            this.router.navigate(['/contact']);
          }
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
      }
    );
  }
}