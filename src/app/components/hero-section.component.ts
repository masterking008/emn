import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<section class="hero relative text-white min-h-screen flex items-center justify-center overflow-hidden sharp">
  <video 
    #heroVideo
    src="https://2k21.s3.ap-south-1.amazonaws.com/emn/Hero.mp4"  
    autoplay 
    muted 
    loop 
    playsinline
    preload="auto"
    class="absolute bottom-0 lg:-bottom-50 w-full object-cover z-0 invert"
    style="pointer-events: none;"
  ></video>

  <div class="container mx-auto px-4 z-10 flex flex-col">
    <div class="flex flex-col items-center lg:absolute lg:top-30 lg:left-1/2 lg:-translate-x-1/2 animate-fade-in">
      <img src="assets/emn.png" alt="EMN Logo" class="h-64 lg:h-84 w-auto drop-shadow-lg object-contain" draggable="false"/>
      <div class="flex flex-wrap gap-4 justify-center">
        <a class="btn bg-white text-black hover:bg-gray-200 px-8 py-3 font-medium text-lg transition-colors shadow-lg sharp border border-white" (click)="login()">LOGIN</a>
        <a routerLink="/become-mentor" class="btn bg-transparent backdrop-blur-2xl border border-white hover:bg-white hover:text-black px-8 py-3 font-medium text-lg transition-colors shadow-lg sharp">BECOME A MENTOR</a>
      </div>
    </div>
  </div>
</section>
`,
  styles: [`
.hero {
  background: linear-gradient(
    90deg,
    #141414 0%, 
    #0e0e0e 12.87%,
    #090909 24.33%,
    #090909 44.87%,
    #111 66.8%,
    #1f1f1f 90.41%,
    #212120 100%
  );
}
`]
})
export class HeroSectionComponent implements AfterViewInit, OnInit {
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  
  ngOnInit() {
    // Use only link preload - more efficient than creating a video element
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = 'https://2k21.s3.ap-south-1.amazonaws.com/emn/Hero.mp4';
      link.as = 'video';
      document.head.appendChild(link);
    }
  }

  ngAfterViewInit() {
    const video = this.heroVideo.nativeElement;
    
    // Ensure video is muted (critical for autoplay)
    video.muted = true;
    
    // Single play attempt with fallback
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If autoplay fails, try once on user interaction
        document.addEventListener('click', () => {
          video.play();
        }, { once: true });
      });
    }
  }

  login() {
    Swal.fire({
      title: 'Dashboard Coming Soon',
      icon: 'info',
      confirmButtonText: 'OK'
    });
    // window.location.href = '/emn/login';
  }
}
