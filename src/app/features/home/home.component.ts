import { Component, OnInit, OnDestroy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  currentYear = new Date().getFullYear();
  formData = {
    pincode: '',
    mobile: ''
  };
  formMessage = '';

  private clockInterval: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.startClock();
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initScrollAnimations();
      this.initSmoothScroll();
    }
  }

  private initSmoothScroll(): void {
    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('.cta-button[href="#hero"]');
    if (ctaButton) {
      ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        const heroSection = document.querySelector('#hero');
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }

  private startClock(): void {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const hourDeg = (hours * 30) + (minutes * 0.5);
      const minuteDeg = (minutes * 6) + (seconds * 0.1);
      const secondDeg = seconds * 6;

      const hourHand = document.getElementById('hour-hand');
      const minuteHand = document.getElementById('minute-hand');
      const secondHand = document.getElementById('second-hand');
      const hourShadow = document.getElementById('hour-shadow');
      const minuteShadow = document.getElementById('minute-shadow');

      if (hourHand) hourHand.style.transform = `rotate(${hourDeg}deg)`;
      if (minuteHand) minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
      if (secondHand) secondHand.style.transform = `rotate(${secondDeg}deg)`;
      if (hourShadow) hourShadow.style.transform = `rotate(${hourDeg}deg)`;
      if (minuteShadow) minuteShadow.style.transform = `rotate(${minuteDeg}deg)`;
    };

    updateClock();
    this.clockInterval = setInterval(updateClock, 1000);
  }

  private initScrollAnimations(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
  }

  // Input formatting for mobile number
  onMobileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove non-digits
    value = value.substring(0, 10); // Limit to 10 digits
    input.value = value;
    this.formData.mobile = value;
  }

  // Input formatting for PIN code
  onPincodeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove non-digits
    value = value.substring(0, 6); // Limit to 6 digits
    input.value = value;
    this.formData.pincode = value;
  }

  private validateMobile(mobile: string): boolean {
    const cleanMobile = mobile.replace(/[\s\-\(\)]/g, '');
    const re = /^[6-9]\d{9}$/; // Indian mobile number format
    return re.test(cleanMobile);
  }

  private validatePincode(pincode: string): boolean {
    const cleanPincode = pincode.replace(/[\s\-\(\)]/g, '');
    const re = /^[1-9]\d{5}$/; // Indian PIN Code format
    return re.test(cleanPincode);
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const userPincode = this.formData.pincode.trim();
    const userMobile = this.formData.mobile.trim();

    // Validation
    if (!userPincode || !this.validatePincode(userPincode)) {
      this.formMessage = '<p style="color: #dc3545;">Please enter a valid PIN Code</p>';
      return;
    }

    if (!userMobile || !this.validateMobile(userMobile)) {
      this.formMessage = '<p style="color: #dc3545;">Please enter a valid 10-digit mobile number.</p>';
      return;
    }

    // Create mailto link
    const recipientEmail = 'fitkhao@gmail.com';
    const subject = encodeURIComponent('Fitkhao App Pre-registration');
    const body = encodeURIComponent(
`Hello Fitkhao Team,

I'd like to pre-register for the Fitkhao app launch!

Please add my details to the notification list:
PIN Code: ${userPincode}
Mobile: +91 ${userMobile}

Looking forward to eating smart and staying fit!`
    );

    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    // Display feedback message
    this.formMessage = '<p style="color: #0b5561;">Opening your email client to pre-register...</p>';

    // Attempt to open the mail client
    setTimeout(() => {
      try {
        if (this.isBrowser) {
          window.location.href = mailtoLink;
          this.formMessage = ''; // Clear message after attempting
        }
      } catch (error) {
        console.error("Failed to open mail client:", error);
        this.formMessage = '<p style="color: #dc3545;">Could not open email client. Please manually email us to pre-register.</p>';
      }
    }, 500); // 0.5 second delay
  }
}
