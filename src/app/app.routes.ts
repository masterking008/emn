import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { RegisterComponent } from './pages/register/register.component';
import { BecomeMentorComponent } from './pages/become-mentor/become-mentor.component';
import { GetMentorComponent } from './pages/get-mentor/get-mentor.component';
import { LoginComponent } from './pages/login/login.component';
import { MentorRegistrationComponent } from './pages/mentor-registration/mentor-registration.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'become-mentor', component: BecomeMentorComponent },
  { path: 'get-mentor', component: GetMentorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mentor-registration', component: MentorRegistrationComponent },
  { path: '**', redirectTo: '' }
];