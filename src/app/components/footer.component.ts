import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="poppins bg-black border-t border-white/75">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 py-8 text-center lg:text-start" >
          
          <!-- Logo & Description -->
          <div class="lg:col-span-8 flex flex-col items-center lg:block">
            <a href="https://www.ecell.in/" target="_blank" class="block">
              <img src="https://eureka2022.s3.ap-south-1.amazonaws.com/ecell-logo2.png" alt="E-Cell Logo" class="w-[300px] -ml-4">
            </a>
            <p class=" text-white mt-4 max-w-md">
              E-Cell IIT Bombay is Asia's Largest Entrepreneurship-promoting student
              body, building a startup ecosystem on both sides of the wall.
            </p>
            <h4 class="text-2xl text-white mt-3">CREATING JOB CREATORS</h4>
          </div>

          <!-- Quick Links -->
          <div class="lg:col-span-2 hidden lg:block">
            <h3 class="text-2xl text-white mb-3">QUICK LINKS</h3>
            <nav class="flex flex-col space-y-2">
              <a href="https://www.ecell.in/esummit/" target="_blank" class="text-white hover:text-gray-300">E-Summit</a>
              <a href="https://www.ecell.in/eureka/" target="_blank" class="text-white hover:text-gray-300">Eureka!</a>
              <a href="https://ecell.in/eurekajunior/" target="_blank" class="text-white hover:text-gray-300">Eureka! Junior</a>
              <a href="https://www.ecell.in/eurekagcc" target="_blank" class="text-white hover:text-gray-300">Eureka! GCC</a>
              <a href="https://www.ecell.in/nec/" target="_blank" class="text-white hover:text-gray-300">NEC</a>
              <a href="https://www.ecell.in/necjunior/" target="_blank" class="text-white hover:text-gray-300">NEC Junior</a>
              <a href="https://www.ecell.in/illuminate" target="_blank" class="text-white hover:text-gray-300">illuminate</a>
              <a href="https://ecell.in/ca/" target="_blank" class="text-white hover:text-gray-300">Campus Ambassador</a>
            </nav>
          </div>

          <!-- Address -->
          <div class="lg:col-span-2 hidden lg:block">
            <h3 class="text-2xl text-white mb-3">REACH OUT</h3>
            <a href="https://goo.gl/maps/7JNM1Ax7w3QMH3jf7" target="_blank" class="text-white hover:text-gray-300">
              <address class="not-italic">
                E-Cell Office,<br/>
                Student Activity Centre (SAC),<br/>
                IIT Bombay, Powai,<br/>
                Mumbai, India
              </address>
            </a>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="border-t border-white/75 py-6">
          <div class="flex flex-col lg:flex-row justify-between items-center">
            
            <!-- Contact -->
            <div class="text-center lg:text-left mb-4 lg:mb-0">
              <h4 class="text-2xl text-white ">CONTACT US:</h4>
              <a href="mailto:junior@ecell.in" target="_blank" class="text-white hover:text-gray-300 underline mt-1 block">
                emn&#64;ecell.in
              </a>
            </div>

            <!-- Social Links -->
            <div class="text-center">
              <h4 class="text-2xl text-white mb-3text-white mb-3">FOLLOW US:</h4>
              <div class="flex space-x-4">
                <a href="https://www.linkedin.com/company/ecell_iitb/" target="_blank" class="text-white hover:text-gray-300">
                  <i class="fab fa-linkedin text-3xl"></i>
                </a>
                <a href="https://www.instagram.com/iitbombay_ecell/" target="_blank" class="text-white hover:text-gray-300">
                  <i class="fab fa-instagram text-3xl"></i>
                </a>
                <a href="https://twitter.com/ecell_iitb" target="_blank" class="text-white hover:text-gray-300">
                  <i class="fab fa-twitter text-3xl"></i>
                </a>
                <a href="https://www.youtube.com/user/entrepreneurshipcell" target="_blank" class="text-white hover:text-gray-300">
                  <i class="fab fa-youtube text-3xl"></i>
                </a>
                <a href="https://www.facebook.com/ecell.in/" target="_blank" class="text-white hover:text-gray-300">
                  <i class="fab fa-facebook text-3xl"></i>
                </a>                
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
