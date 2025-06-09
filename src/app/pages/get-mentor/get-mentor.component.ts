import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-get-mentor',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './get-mentor.component.html',
  styleUrls: ['./get-mentor.component.css']
})
export class GetMentorComponent {
  
}