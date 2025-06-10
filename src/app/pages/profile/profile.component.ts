import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer.component';
import { NavbarComponent } from "../../components/navbar.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [FooterComponent, NavbarComponent],
})
export class ProfileComponent {
  // ...existing code...
}