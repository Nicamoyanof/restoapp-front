import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-summary',
  imports: [FormsModule],
  templateUrl: './order-summary.component.html',
  styles: ``
})
export class OrderSummaryComponent {
  value: number = 1;
  meatValue: number = 2;
  indianValue: number = 2;

  // Handlers for the first counter:
  handleMinusValue() {
    if (this.value > 0) {
      this.value--;
    }
  }

  handlePlusValue() {
    if (this.value < 100) {
      this.value++;
    }
  }

  // Handlers for the second counter:
  handleMinusMeat() {
    if (this.meatValue > 0) {
      this.meatValue--;
    }
  }

  handlePlusMeat() {
    if (this.meatValue < 100) {
      this.meatValue++;
    }
  }
   // Handlers for the second counter:
  handleMinusIndian() {
    if (this.indianValue > 0) {
      this.indianValue--;
    }
  }

  handlePlusIndian() {
    if (this.indianValue < 100) {
      this.indianValue++;
    }
  }
}
