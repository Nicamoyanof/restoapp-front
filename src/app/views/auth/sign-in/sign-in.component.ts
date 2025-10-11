import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  type UntypedFormGroup,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { currentYear } from '@common/constants';
import { login } from '@store/authentication/authentication.actions';
import { getError } from '@store/authentication/authentication.selector';
import { AuthenticationService } from '@core/services/auth.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignInComponent implements OnInit {
  public fb = inject(UntypedFormBuilder);
  public store = inject(Store);
  public service = inject(AuthenticationService);
  public authService = inject(AuthService);
  currentYear = currentYear;
  signInForm!: UntypedFormGroup;
  submitted: boolean = false;

  errorMessage: string = '';
  constructor(
    private renderer: Renderer2,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.body, 'authentication-bg');
    this.signInForm = this.fb.group({
      email: ['user@demo.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
    });

    this.authService.getAccessTokenSilently().subscribe((token) => {
      // this.service.saveSession(token);
      console.log('Token', token);
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'authentication-bg');
  }

  get formValues() {
    return this.signInForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.signInForm.valid) {
      const email = this.formValues['email'].value; // Get the username from the form
      const password = this.formValues['password'].value; // Get the password from the form

      // Login Api
      this.store.dispatch(login({ email: email, password: password }));

      this.store.select(getError).subscribe((data) => {
        if (data) {
          this.errorMessage = data.error.message;

          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      });
    }
  }

  loginAuth0() {
    this.auth.loginWithRedirect({
      // appState: { target: this },
      authorizationParams: {
        audience: 'https://dev-w1bl5owcn51l2yqv.us.auth0.com/api/v2/', // el Identifier real de tu API
        scope: 'openid profile email read:loqueuses',
        prompt: 'consent', // fuerza el diálogo de consentimiento
      },
    });
  }
}
