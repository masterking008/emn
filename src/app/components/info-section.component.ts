import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 section-light sharp relative">
      <div
        class="absolute left-75 md:left-75 top-2/4 w-10 md:w-20 h-32 md:h-64 bg-gradient-to-b from-transparent via-[#D9D9D9] to-transparent  hidden md:block"
      ></div>
      <div
        class="absolute left-100 md:left-100 top-1/4 w-10 md:w-20 h-32 md:h-64 bg-gradient-to-b from-transparent via-[#D9D9D9] to-transparent  hidden md:block"
      ></div>
      <div
        class="absolute left-125 md:left-125 top-2/4 w-10 md:w-20 h-32 md:h-64 bg-gradient-to-b from-transparent via-[#D9D9D9] to-transparent  hidden md:block"
      ></div>
      <div class="container mx-auto px-4 relative ">
        <div class="max-w-5xl mx-auto text-center">
          <h2 class="text-7xl md:text-9xl font-bold mb-8 text-black">
            WHAT IS EMN?
          </h2>

          <p class="text-xl md:text-3xl text-black leading-relaxed pb-24">
            Eureka! Mentorship Network (EMN) is a platform that connects
            early-stage start-ups with experienced mentors to provide strategic
            guidance, industry insights and hands-on support. EMN helps founders
            refine ideas, solve challenges and grow faster, with the right
            people by their side.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class InfoSectionComponent {}
