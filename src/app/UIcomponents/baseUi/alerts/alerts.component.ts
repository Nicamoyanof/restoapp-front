import { Component } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [
  {
    type: 'primary',
    message: 'A simple primary alert—check it out!',
  },
  
  {
    type: 'secondary',
    message: 'This is a secondary alert',
  },
  {
    type: 'success',
    message: 'This is an success alert',
  },
  {
    type: 'danger',
    message: 'This is a danger alert',
  },
  {
    type: 'info',
    message: 'This is an info alert',
  },
  {
    type: 'warning',
    message: 'This is a warning alert',
  },
 

  {
    type: 'light',
    message: 'This is a light alert',
  },
  {
    type: 'dark',
    message: 'This is a dark alert',
  },
];
@Component({
  selector: 'app-alerts',
  imports: [NgbAlertModule],
  templateUrl: './alerts.component.html',
  styles: ``
})
export class AlertsComponent {
  alerts = ALERTS

  liveAlert() {
    alert('Nice, you triggered this alert message!')
  }


  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
