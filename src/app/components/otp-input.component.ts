import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-otp-input',
  standalone: true, // Add standalone: true
  imports: [CommonModule], // Add CommonModule to imports
  template: `<div class="otp-container">
  <input type="text" maxlength="1" class="otp-input" id="otp-1" inputmode="numeric" pattern="[0-9]*" aria-label="Digit 1" (keyup)="onKeyUp($event, 1)">
  <input type="text" maxlength="1" class="otp-input" id="otp-2" inputmode="numeric" pattern="[0-9]*" aria-label="Digit 2" (keyup)="onKeyUp($event, 2)">
  <input type="text" maxlength="1" class="otp-input" id="otp-3" inputmode="numeric" pattern="[0-9]*" aria-label="Digit 3" (keyup)="onKeyUp($event, 3)">
  <input type="text" maxlength="1" class="otp-input" id="otp-4" inputmode="numeric" pattern="[0-9]*" aria-label="Digit 4" (keyup)="onKeyUp($event, 4)">
  <input type="text" maxlength="1" class="otp-input" id="otp-5" inputmode="numeric" pattern="[0-9]*" aria-label="Digit 5" (keyup)="onKeyUp($event, 5)">
  <input type="text" maxlength="1" class="otp-input" id="otp-6" inputmode="numeric" pattern="[0-9]*" aria-label="Digit 6" (keyup)="onKeyUp($event, 6)">
</div>
`,
  styles: `.otp-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 15px 0;
}

.otp-input {
  width: 45px;
  height: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 0;
  border-radius: 0; /* Sharp edges */
  border: 1px solid white;
  background-color: black;
  color: white;
  transition: all 0.3s ease;
}

.otp-input:focus {
  outline: none;
  border-color: white;
  box-shadow: none;
  background-color: black;
}

/* Responsive styles */
@media (max-width: 768px) {
  .otp-input {
    width: 40px;
    height: 45px;
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .otp-input {
    width: 35px;
    height: 40px;
    font-size: 16px;
  }
}`
})
export class OtpInputComponent {
  otp: string[] = new Array(6).fill('');
  @Output() otpChange = new EventEmitter<string>();

  onKeyUp(event: KeyboardEvent, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    if (value.length === 1 && index < 6) {
      this.otp[index - 1] = value;
      const nextElement = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextElement) {
        nextElement.focus();
      }
    } else if (event.key === 'Backspace' && index > 1) {
      this.otp[index - 1] = '';
      const prevElement = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevElement) {
        prevElement.focus();
      }
    } else if (value.length === 1 && index === 6) {
      this.otp[index - 1] = value;
    }


    // Emit the full OTP string
    if (this.otp.every(digit => digit !== '')) {
      this.otpChange.emit(this.otp.join(''));
    } else {
      this.otpChange.emit(''); // Emit empty if not all filled
    }
  }
}
