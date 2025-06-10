import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar.component';
import { FooterComponent } from '../../components/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {
  entries = 0;
  prizes = 0;
  mentors = 0;
  edition = 0;

  ngAfterViewInit() {
    this.animateCountUp('entries', 27000);
    this.animateCountUp('prizes', 2);
    this.animateCountUp('mentors', 300);
    this.animateCountUp('edition', 28);
  }

  animateCountUp(property: string, target: number) {
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(progress * target);
      
      switch(property) {
        case 'entries':
          this.entries = currentCount;
          break;
        case 'prizes':
          this.prizes = currentCount;
          break;
        case 'mentors':
          this.mentors = currentCount;
          break;
        case 'edition':
          this.edition = currentCount;
          break;
      }
      
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  }
}