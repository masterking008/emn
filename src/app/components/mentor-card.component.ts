import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mentor-card',
  template: `
    <div class="bg-black shadow-md p-6 flex flex-col items-center glass sharp border border-white">
      <img [src]="mentor.image || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80'" alt="{{mentor.name}}" class="w-20 h-20 object-cover mb-4 border-2 border-white shadow sharp" />
      <h4 class="font-bold text-lg mb-1 text-white">{{mentor.name}}</h4>
      <p class="text-gray-300 text-sm mb-1">{{mentor.location}}</p>
    </div>
  `,
  styles: []
})
export class MentorCardComponent {
  @Input() mentor: any;
}