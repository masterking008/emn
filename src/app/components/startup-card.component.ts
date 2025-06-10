import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-startup-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-black/95 backdrop-blur-lg shadow-2xl p-8 flex flex-col items-center relative overflow-hidden border border-white/20">
      <div class="relative mb-4">
        <img [src]="startup.logo" alt="{{startup.name}}" class="w-full object-cover border border-white/30 " draggable="false"/>
        <h4 class="font-bold text-3xl mt-4 mb-2 flex items-center text-white/90">{{startup.name}}</h4>
        <!-- <p class="text-white/70 text-md mb-2 flex items-center"><i class="fa fa-calendar mr-2"></i>{{startup.year}}</p> -->
        <p class="text-white/60 text-md mb-3 flex items-center">{{startup.description}}</p>
        <!-- <a *ngIf="startup.website" [href]="startup.website" target="_blank" class="text-white/90 hover:text-white font-medium flex items-center transition-colors"><i class="fa fa-external-link mr-2"></i>Visit Website</a> -->
      </div>
      <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
    </div>
  `,
  styles: []
})
export class StartupCardComponent {
  @Input() startup: any;
}
