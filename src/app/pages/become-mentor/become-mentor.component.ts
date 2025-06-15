import { Component, ViewChild } from '@angular/core';
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
@ViewChild('notified') notified: any;
  scrollToBottom() {
    const offset = -60; // adjust this negative value to scroll slightly *above* the element
    const top =
      this.notified.nativeElement.getBoundingClientRect().top +
      window.pageYOffset +
      offset;

    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }
}