import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-become-mentor',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './become-mentor.component.html',
  styleUrls: ['./become-mentor.component.css']
})
export class BecomeMentorComponent {
  
}