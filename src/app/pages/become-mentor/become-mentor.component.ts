import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar.component';
import { FooterComponent } from '../../components/footer.component';

@Component({
  selector: 'app-become-mentor',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './become-mentor.component.html',
  styleUrls: ['./become-mentor.component.css']
})
export class BecomeMentorComponent {
  
}