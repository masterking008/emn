import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'become-mentor',
    loadComponent: () => import('./pages/become-mentor/become-mentor.component').then(m => m.BecomeMentorComponent)
  },
  {
    path: 'get-mentor',
    loadComponent: () => import('./pages/get-mentor/get-mentor.component').then(m => m.GetMentorComponent)
  },
  // {
  //   path: 'login',
  //   loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  // },
  // {
  //   path: 'mentor-registration',
  //   loadComponent: () => import('./pages/mentor-registration/mentor-registration.component').then(m => m.MentorRegistrationComponent)
  // },
  {
    path: 'eurekapastwinner',
    loadComponent: () => import('./pages/eureka/eureka.component').then(m => m.EurekaComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];