import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-8  border-white  text-center transform transition-all duration-300">
<img [src]="image" [alt]="name" class="w-60 h-60 sharp mx-auto mb-4 object-cover rounded-none" draggable="false">      <h3 class="text-2xl md:text-3xl font-bold  text-black">{{ name }}</h3>
      <p class="text-lg md:text-xl text-black mb-2">{{ position }}</p>
      <div class="flex justify-center gap-6">
        <a [href]="'mailto:' + email" class="text-gray-800 ">
          <i class="fa fa-envelope text-2xl"></i>
        </a>
        <a [href]="'https://wa.me/+91' + phone" class="text-gray-800 " target="_blank">
          <i class="fab fa-whatsapp text-2xl"></i>
        </a>
        <a [href]="linkedin" class="text-gray-800 ">
          <i class="fab fa-linkedin text-2xl"></i>
        </a>
      </div>
    </div>
  `,
  styles: []
})
export class ContactCardComponent {
  @Input() name: string = '';
  @Input() position: string = '';
  @Input() email: string = '';
  @Input() phone: string = '';
  @Input() image: string = '';
  @Input() linkedin: string = '';
}