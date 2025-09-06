import { calculateTimeToEvent } from '@/app/helper/utils';
import { Component, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { credits, currentYear } from '@common/constants';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-comingsoon',
  imports: [RouterLink],
  templateUrl: './comingsoon.component.html',
  styles: ``
})
export class ComingsoonComponent {
  currentYear = currentYear
  credits = credits
  
  _days?: number
  _hours?: number
  _minutes?: number
  _seconds?: number
  countdown: { days: number; hours: number; minutes: number; seconds: number } =
  {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }
  private intervalSubscription!: Subscription
  // private renderer = inject(Renderer2)
  constructor(private renderer: Renderer2) {  }

  ngOnInit(): void {
    this.countdown = calculateTimeToEvent()
    this.intervalSubscription = interval(1000).subscribe(() => {
      this.countdown = calculateTimeToEvent()
    })
    this.renderer.addClass(document.body, 'authentication-bg');
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe()
    this.renderer.removeClass(document.body, 'authentication-bg')
  }
}
