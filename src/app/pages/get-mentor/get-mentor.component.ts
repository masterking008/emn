import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar.component';
import { FooterComponent } from '../../components/footer.component';

@Component({
  selector: 'app-get-mentor',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './get-mentor.component.html',
  styleUrls: ['./get-mentor.component.css']
})
export class GetMentorComponent {
  
}