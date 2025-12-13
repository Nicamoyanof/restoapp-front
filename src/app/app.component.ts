import {
  ChangeDetectorRef,
  Component,
  inject,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
  type Event,
} from '@angular/router';
import { TitleService } from '@core/services/title.service';
import {
  NgProgressComponent,
  NgProgressModule,
  type NgProgressRef,
} from 'ngx-progressbar';
import { ToastsContainer } from './UIcomponents/baseUi/toasts/toasts-container.component';
import { AuthService } from '@auth0/auth0-angular';
import { ClientService } from './services/client.service';
import { SelectFormInputDirective } from '@core/directives/select-form-input.directive';
import { SpinnerService } from './services/spinner.service';
import { OfflineQueueService } from './services/offline-queue.service';
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgProgressModule,
    ToastsContainer,
    SelectFormInputDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnChanges {
  title = 'metor-angular';
  private titleService = inject(TitleService);
  progressRef!: NgProgressRef;
  @ViewChild(NgProgressComponent) progressBar!: NgProgressComponent;
  isLoading = false;

  ngOnChanges(changes: SimpleChanges): void {
    // Handle changes
    console.log('Changes detected:', changes);
    this.cdr.detectChanges();
  }

  private router = inject(Router);

  constructor(
    private clientService: ClientService,
    private spinnerService: SpinnerService,
    private cdr: ChangeDetectorRef,
    private queue: OfflineQueueService
  ) {
    this.router.events.subscribe((event: Event) => {
      this.checkRouteChange(event);
    });

    this.queue.processQueue();

    // cuando vuelve la red (debounce para evitar spam)
    fromEvent(window, 'online')
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.queue.processQueue();
      });
  }

  async ngOnInit() {
    this.titleService.init();

    this.clientService.getClient();
    this.spinnerService.isLoading.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  checkRouteChange(routerEvent: Event) {
    if (routerEvent instanceof NavigationStart) {
      this.progressBar.start();
    }
    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      setTimeout(() => {
        this.progressBar.complete();
      }, 200);
    }
  }
}
