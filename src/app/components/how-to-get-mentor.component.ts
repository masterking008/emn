import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-to-get-mentor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-12 md:py-16 lg:py-24 bg-black">
      <div class="container mx-auto px-4">
              <h2 class="text-7xl md:text-9xl font-bold text-center px-5 mb-8 md:mb-12 text-white">
HOW TO GET A MENTOR?</h2>
        
        <div class="relative">
          <!-- Mobile view (vertical steps) -->
          <div class="md:hidden flex flex-col items-center space-y-2">
            <!-- Step 1 -->
            <div class="flex items-center">
              <div class="relative flex flex-col items-center">

                <div class="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-10 relative">
                  <span class="text-black font-bold text-xl">1</span>
                </div>
                <p class="text-white font-bold text-lg mt-4 text-center w-48">SEARCH FOR THE MENTOR</p>
              </div>
            </div>
            
            <!-- Connector down -->
            <div class="h-24 w-4 bg-white"></div>
            
            <!-- Step 2 -->
            <div class="flex items-center">
              <div class="relative flex flex-col items-center">

                <div class="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-10 relative">
                  <span class="text-black font-bold text-xl">2</span>
                </div>
                <p class="text-white font-bold text-lg mt-4 text-center w-48">SEND A REQUEST FOR THE MEET</p>
              </div>
            </div>
            
            <!-- Connector down -->
            <div class="h-24 w-4 bg-white"></div>
            
            <!-- Step 3 -->
            <div class="flex items-center">
              <div class="relative flex flex-col items-center">

                <div class="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-10 relative">
                  <span class="text-black font-bold text-xl">3</span>
                </div>
                <p class="text-white font-bold text-lg mt-4 text-center w-48">SEND RELATED INFORMATIONS</p>
              </div>
            </div>
            
            <!-- Connector down -->
            <div class="h-24 w-4 bg-white"></div>
            
            <!-- Step 4 -->
            <div class="flex items-center">
              <div class="relative flex flex-col items-center">

                <div class="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-10 relative">
                  <span class="text-black font-bold text-xl">4</span>
                </div>
                <p class="text-white font-bold text-lg mt-4 text-center w-48">MANAGE OUTCOMES</p>
              </div>
            </div>
          </div>
          
          <!-- Tablet view (zigzag steps) -->
          <div class="hidden md:block lg:hidden max-w-3xl mx-auto">
            <div class="relative h-[500px]">
              <!-- Step 1 -->
              <div class="absolute left-0 top-2">
                <div class="relative flex flex-col items-center">
                  <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg z-10 relative">
                    <span class="text-black font-bold text-2xl">1</span>
                  </div>
                  <p class="text-white font-bold text-xl mt-4 text-center w-48">SEARCH FOR THE MENTOR</p>
                </div>
              </div>
              
              <!-- Step 2 -->
              <div class="absolute right-4 -top-4 mt-32">
                <div class="relative flex flex-col items-center">

                  <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg z-10 relative">
                    <span class="text-black font-bold text-2xl">2</span>
                  </div>
                  <p class="text-white font-bold text-xl mt-4 text-center w-48">SEND A REQUEST FOR THE MEET</p>
                </div>
              </div>
              
              <!-- Step 3 -->
              <div class="absolute left-0 -bottom-21 mb-32">
                <div class="relative flex flex-col items-center">

                  <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg z-10 relative">
                    <span class="text-black font-bold text-2xl">3</span>
                  </div>
                  <p class="text-white font-bold text-xl mt-4 text-center w-48">SEND RELATED INFORMATIONS</p>
                </div>
              </div>
              
              <!-- Step 4 -->
              <div class="absolute right-4 -bottom-16">
                <div class="relative flex flex-col items-center">

                  <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg z-10 relative">
                    <span class="text-black font-bold text-2xl">4</span>
                  </div>
                  <p class="text-white font-bold text-xl mt-4 text-center w-48">MANAGE OUTCOMES</p>
                </div>
              </div>
              <!-- Connecting lines (Tablet) -->
              <svg class="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <!-- Line from 1 to 2 -->
                <path d="M100,50 L600,150" stroke="white" stroke-width="15" fill="none" />
                
                <!-- Line from 2 to 3 -->
                <path d="M600,150 L100,350" stroke="white" stroke-width="15" fill="none" />
                
                <!-- Line from 3 to 4 -->
                <path d="M100,350 L600,450" stroke="white" stroke-width="15" fill="none" />
              </svg>
            </div>
          </div>

          <!-- Desktop view (zigzag steps) -->
          <div class="hidden lg:block max-w-5xl mx-auto">
            <div class="relative h-[500px]">
              <!-- Step 1 -->
              <div class="absolute left-0 top-2">
                <div class="relative flex flex-col items-center">
                  <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg z-10 relative">
                    <span class="text-black font-bold text-2xl">1</span>
                  </div>
                  <p class="text-white font-bold text-xl mt-4 text-center w-56">SEARCH FOR THE MENTOR</p>
                </div>
              </div>
              
              <!-- Step 2 -->
              <div class="absolute right-0 -top-4 mt-32">
                <div class="relative flex flex-col items-center">

                  <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg z-10 relative">
                    <span class="text-black font-bold text-2xl">2</span>
                  </div>
                  <p class="text-white font-bold text-xl mt-4 text-center w-56">SEND A REQUEST FOR THE MEET</p>
                </div>
              </div>
              
              <!-- Step 3 -->
              <div class="absolute left-0 -bottom-21 mb-32">
                <div class="relative flex flex-col items-center">

                  <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg z-10 relative">
                    <span class="text-black font-bold text-2xl">3</span>
                  </div>
                  <p class="text-white font-bold text-xl mt-4 text-center w-56">SEND RELATED INFORMATIONS</p>
                </div>
              </div>
              
              <!-- Step 4 -->
              <div class="absolute right-0 -bottom-8">
                <div class="relative flex flex-col items-center">

                  <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg z-10 relative">
                    <span class="text-black font-bold text-2xl">4</span>
                  </div>
                  <p class="text-white font-bold text-xl mt-4 text-center w-56">MANAGE OUTCOMES</p>
                </div>
              </div>
              <!-- Connecting lines (Desktop) -->
              <svg class="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <!-- Line from 1 to 2 -->
                <path d="M100,50 L900,150" stroke="white" stroke-width="15" fill="none" />
                
                <!-- Line from 2 to 3 -->
                <path d="M900,150 L100,350" stroke="white" stroke-width="15" fill="none" />
                
                <!-- Line from 3 to 4 -->
                <path d="M100,350 L900,450" stroke="white" stroke-width="15" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Custom styles if needed */
  `]
})
export class HowToGetMentorComponent {}