import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-key-functions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="bg-black text-white font-sans min-h-screen flex flex-col items-center justify-start py-10"
    >
      <h2 class="text-5xl md:text-7xl lg:text-9xl font-bold text-center mb-8 md:mb-12 text-white">
        KEY FUNCTIONS OF EMN
      </h2>

      <div
        class="flex flex-col md:flex-row xl:max-w-7xl w-full px-4 md:h-[400px] gap-4 md:gap-2 transition-all duration-300 ease-in-out"
      >
        <!-- Item 1 -->
        <div
          class="section flex-1 bg-black border-2 border-white transition-all duration-300 ease-in-out flex flex-col items-center justify-around overflow-hidden hover:flex-[2] hover:bg-slate-700 hover:justify-center group min-h-[200px] md:min-h-0"
        >
          <span
            class="mt-4 text-sm md:text-base group-hover:mt-4 group-hover:text-xs group-hover:text-gray-400"
            ><h1 class="text-2xl md:text-3xl lg:text-5xl">01</h1></span
          >
          <div
            class="font-bold text-base md:text-lg md:rotate-90 group-hover:rotate-0 group-hover:text-lg group-hover:text-center md:group-hover:text-xl mb-4 transition-transform duration-300"
          >
            <h2 class="p-1 text-xl md:text-2xl lg:text-4xl">CHOOSE YOUR OWN MENTOR</h2>
          </div>
          <div
            class="hidden group-hover:block text-sm md:text-base text-gray-300 px-4 md:px-6 text-center font-['Poppins']"
          >
            Select from our pool of experienced mentors tailored to your needs
          </div>
        </div>

        <!-- Repeat similar changes for items 2-7 -->
        <!-- Item 2 -->
        <div
          class="section flex-1 bg-black border-2 border-white transition-all duration-300 ease-in-out flex flex-col items-center justify-around overflow-hidden hover:flex-[2] hover:bg-slate-700 hover:justify-center group min-h-[200px] md:min-h-0"
        >
          <span
            class="mt-4 text-sm md:text-base group-hover:mt-4 group-hover:text-xs group-hover:text-gray-400"
            ><h1 class="text-2xl md:text-3xl lg:text-5xl">02</h1></span
          >
          <div
            class="font-bold text-base md:text-lg md:rotate-90 group-hover:rotate-0 group-hover:text-lg group-hover:text-center md:group-hover:text-xl mb-4 transition-transform duration-300"
          >
            <h2 class="p-1 text-xl md:text-2xl lg:text-4xl">1-ON-1 MENTORSHIP SESSIONS</h2>
          </div>
          <div
            class="hidden group-hover:block text-sm md:text-base text-gray-300 px-4 md:px-6 text-center font-['Poppins']"
          >
            Personalized guidance through dedicated one-on-one sessions
          </div>
        </div>

        <!-- Item 3 -->
        <div
          class="section flex-1 bg-black border-2 border-white transition-all duration-300 ease-in-out flex flex-col items-center justify-around overflow-hidden hover:flex-[2] hover:bg-slate-700 hover:justify-center group min-h-[200px] md:min-h-0"
        >
          <span
            class="mt-4 text-sm md:text-base group-hover:mt-4 group-hover:text-xs group-hover:text-gray-400"
            ><h1 class="text-2xl md:text-3xl lg:text-5xl">03</h1></span
          >
          <div
            class="font-bold text-base md:text-lg md:rotate-90 group-hover:rotate-0 group-hover:text-lg group-hover:text-center md:group-hover:text-xl mb-4 transition-transform duration-300"
          >
            <h2 class="p-1 text-xl md:text-2xl lg:text-4xl">MUTUAL SELECTION PROCESS</h2>
          </div>
          <div
            class="hidden group-hover:block text-sm md:text-base text-gray-300 px-4 md:px-6 text-center font-['Poppins']"
          >
            Both mentors and mentees approve matches for optimal compatibility
          </div>
        </div>

        <!-- Item 4 -->
        <div
          class="section flex-1 bg-black border-2 border-white transition-all duration-300 ease-in-out flex flex-col items-center justify-around overflow-hidden hover:flex-[2] hover:bg-slate-700 hover:justify-center group min-h-[200px] md:min-h-0"
        >
          <span
            class="mt-4 text-sm md:text-base group-hover:mt-4 group-hover:text-xs group-hover:text-gray-400"
            ><h1 class="text-2xl md:text-3xl lg:text-5xl">04</h1></span
          >
          <div
            class="font-bold text-base md:text-lg md:rotate-90 group-hover:rotate-0 group-hover:text-lg group-hover:text-center md:group-hover:text-xl mb-4 transition-transform duration-300"
          >
            <h2 class="p-1 text-xl md:text-2xl lg:text-4xl">SEAMLESS SCHEDULING</h2>
          </div>
          <div
            class="hidden group-hover:block text-sm md:text-base text-gray-300 px-4 md:px-6 text-center font-['Poppins']"
          >
            Easy calendar integration for hassle-free session scheduling
          </div>
        </div>

        <!-- Item 5 -->
        <div
          class="section flex-1 bg-black border-2 border-white transition-all duration-300 ease-in-out flex flex-col items-center justify-around overflow-hidden hover:flex-[2] hover:bg-slate-700 hover:justify-center group min-h-[200px] md:min-h-0"
        >
          <span
            class="mt-4 text-sm md:text-base group-hover:mt-4 group-hover:text-xs group-hover:text-gray-400"
            ><h1 class="text-2xl md:text-3xl lg:text-5xl">05</h1></span
          >
          <div
            class="font-bold text-base md:text-lg md:rotate-90 group-hover:rotate-0 group-hover:text-lg group-hover:text-center md:group-hover:text-xl mb-4 transition-transform duration-300"
          >
            <h2 class="p-1 text-xl md:text-2xl lg:text-4xl">
              STARTUP NETWORKING
            </h2>
          </div>
          <div
            class="hidden group-hover:block text-sm md:text-base text-gray-300 px-4 md:px-6 text-center font-['Poppins']"
          >
            Connect and collaborate with fellow startups through peer-to-peer sessions
          </div>
        </div>

        <!-- Item 6 -->
        <div
          class="section flex-1 bg-black border-2 border-white transition-all duration-300 ease-in-out flex flex-col items-center justify-around overflow-hidden hover:flex-[2] hover:bg-slate-700 hover:justify-center group min-h-[200px] md:min-h-0"
        >
          <span
            class="mt-4 text-sm md:text-base group-hover:mt-4 group-hover:text-xs group-hover:text-gray-400"
            ><h1 class="text-2xl md:text-3xl lg:text-5xl">06</h1></span
          >
          <div
            class="font-bold text-base md:text-lg md:rotate-90 group-hover:rotate-0 group-hover:text-lg group-hover:text-center md:group-hover:text-xl mb-4 transition-transform duration-300"
          >
            <h2 class="p-1 text-xl md:text-2xl lg:text-4xl">REGULAR FEEDBACK</h2>
          </div>
          <div
            class="hidden group-hover:block text-sm md:text-base text-gray-300 px-4 md:px-6 text-center font-['Poppins']"
          >
            Continuous improvement through structured feedback mechanisms
          </div>
        </div>

        <!-- Item 7 -->
        <div
          class="section flex-1 bg-black border-2 border-white transition-all duration-300 ease-in-out flex flex-col items-center justify-around overflow-hidden hover:flex-[2] hover:bg-slate-700 hover:justify-center group min-h-[200px] md:min-h-0"
        >
          <span
            class="mt-4 text-sm md:text-base group-hover:mt-4 group-hover:text-xs group-hover:text-gray-400"
            ><h1 class="text-2xl md:text-3xl lg:text-5xl">07</h1></span
          >
          <div
            class="font-bold text-base md:text-lg md:rotate-90 group-hover:rotate-0 group-hover:text-lg group-hover:text-center md:group-hover:text-xl mb-4 transition-transform duration-300"
          >
            <h2 class="p-1 text-xl md:text-2xl lg:text-4xl">
              SECURE COMMUNICATION
            </h2>
          </div>
          <div
            class="hidden group-hover:block text-sm md:text-base text-gray-300 px-4 md:px-6 text-center font-['Poppins']"
          >
            Protected messaging and video calls within the platform
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class KeyFunctionsComponent {}
