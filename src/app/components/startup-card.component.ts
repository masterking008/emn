import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Startup {
  logo: string;
  name: string;
  description: string;
  year?: number;
  website?: string;
}

@Component({
  selector: 'app-startup-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-black/95 backdrop-blur-lg shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center relative overflow-hidden border border-white/20 min-h-[400px] sm:min-h-[500px] md:min-h-[660px] w-full">
      <div class="relative mb-4 w-full max-w-sm mx-auto">
        <div class="bg-white aspect-square flex items-center justify-center rounded-lg overflow-hidden">
          <img [src]="startup.logo" [alt]="startup.name" class="w-full h-full object-contain p-2 border border-white/30" draggable="false"/>
        </div>
      
        <h4 class="font-bold text-xl sm:text-2xl md:text-3xl mt-4 mb-2 flex items-center text-white/90 text-center">{{startup.name}}</h4>
        <!-- <p class="text-white/70 text-sm sm:text-md mb-2 flex items-center justify-center"><i class="fa fa-calendar mr-2"></i>{{startup.year}}</p> -->
        <p class="text-white/60 text-sm sm:text-md mb-3 flex items-center leading-relaxed">{{startup.description}}</p>
        <!-- <a *ngIf="startup.website" [href]="startup.website" target="_blank" class="text-white/90 hover:text-white font-medium flex items-center justify-center transition-colors"><i class="fa fa-external-link mr-2"></i>Visit Website</a> -->
      </div>
      <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class StartupCardComponent {
  @Input() startup!: any;
}
