import { Component } from '@angular/core';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {

  count = 0;

  // handleIncrement() {
  //   this.count = this.count + 1
  // }

  // handleDecrement() {
  //   this.count = this.count - 1
  // }

  // handleReset() {
  //   this.count = 0
  // }

  handleCounter(val: string) {
    if (val == 'minus' && this.count > 0) {
      this.count = this.count - 1
    } else if (val == 'plus') {
      this.count = this.count + 1
    } else {
      this.count = 0
    }
  }
}
