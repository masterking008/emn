import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
  open?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  profile_pic: string | null;
  message: string;
  role: 'mentor' | 'startup';
}

export interface ConnectedMentor {
  id: number;
  name: string;
  designation: string;
  location: string | null;
  profile_pic: string | null;
}

export interface PastWinner {
  id: number;
  name: string;
  logo: string | null;
  description: string | null;
  order: number;
}

export interface ContactProfile {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  profile_pic: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  // Content endpoints
  getFAQs(): Observable<FAQ[]> {
    return this.http.get<FAQ[]>(`${this.baseUrl}/faqs/`);
  }

  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.baseUrl}/testimonials/`);
  }

  getConnectedMentors(): Observable<ConnectedMentor[]> {
    return this.http.get<ConnectedMentor[]>(`${this.baseUrl}/connected-mentors/`);
  }

  getPastWinners(): Observable<PastWinner[]> {
    return this.http.get<PastWinner[]>(`${this.baseUrl}/past-winners/`);
  }

  getContacts(): Observable<ContactProfile[]> {
    return this.http.get<ContactProfile[]>(`${this.baseUrl}/contacts/`);
  }
}