import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface KeyFunction {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-key-functions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-black text-white font-sans min-h-screen flex flex-col items-center justify-start py-10">
      <h2 class="text-7xl md:text-9xl font-bold text-center px-5 mb-8 md:mb-12 text-white">
        KEY FUNCTIONS OF EMN
      </h2>

      <div class="flex flex-col md:flex-row xl:max-w-7xl w-full px-4 md:h-[500px] gap-4 md:gap-0 transition-all duration-300 ease-in-out">
        <ng-container *ngFor="let item of keyFunctions">
          <div class="section flex-1 bg-black border-2 border-white transition-all duration-300 ease-in-out flex flex-col items-center justify-around overflow-hidden hover:flex-[2] focus:flex-[2] active:flex-[2] hover:bg-[#282828] focus:bg-[#282828] active:bg-[#282828] hover:justify-center focus:justify-center active:justify-center group min-h-[200px] md:min-h-0" tabindex="0">
            <span class="mt-4 text-sm md:text-base group-hover:mt-4 group-focus:mt-4 group-active:mt-4 group-hover:text-xs group-focus:text-xs group-active:text-xs group-hover:text-white group-focus:text-white group-active:text-white">
              <h1 class="text-4xl md:text-3xl lg:text-5xl transition-all duration-300 ease-in-out">{{item.id}}</h1>
            </span>
            <div class="font-bold text-base md:text-lg md:rotate-90 group-hover:rotate-0 group-focus:rotate-0 group-active:rotate-0 group-hover:text-lg group-focus:text-lg group-active:text-lg group-hover:text-center group-focus:text-center group-active:text-center md:group-hover:text-xl md:group-focus:text-xl md:group-active:text-xl mb-4 transition-all duration-300 ease-in-out">
              <h2 class="p-1 text-4xl md:text-2xl lg:text-4xl">{{item.title}}</h2>
            </div>
            <div class="hidden group-hover:block group-focus:block group-active:block text-base text-gray-300 px-4 md:px-6 text-center font-['Poppins']">
              {{item.description}}
            </div>
          </div>
        </ng-container>
      </div>
    </section>
  `,
  styles: [],
})
export class KeyFunctionsComponent {
  keyFunctions: KeyFunction[] = [
    {
      id: '01',
      title: 'CHOOSE YOUR OWN MENTOR',
      description: 'Select from our pool of experienced mentors tailored to your needs'
    },
    {
      id: '02', 
      title: '1-ON-1 MENTORSHIP SESSIONS',
      description: 'Personalized guidance through dedicated one-on-one sessions'
    },
    {
      id: '03',
      title: 'MUTUAL SELECTION PROCESS',
      description: 'Both mentors and mentees approve matches for optimal compatibility'
    },
    {
      id: '04',
      title: 'SEAMLESS SCHEDULING',
      description: 'Easy calendar integration for hassle-free session scheduling'
    },
    {
      id: '05',
      title: 'STARTUP NETWORKING',
      description: 'Connect and collaborate with fellow startups through peer-to-peer sessions'
    },
    {
      id: '06',
      title: 'REGULAR FEEDBACK',
      description: 'Continuous improvement through structured feedback mechanisms'
    },
    {
      id: '07',
      title: 'SECURE COMMUNICATION',
      description: 'Protected messaging and video calls within the platform'
    }
  ];
}

