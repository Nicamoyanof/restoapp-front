import { Route } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { LockScreenComponent } from "./lock-screen/lock-screen.component";

export const AUTH_ROUTES: Route[] = [
    {
        path: 'signin',
        component: SignInComponent,
        data: { title: 'Sign In' },
    },
    {
        path: 'signup',
        component: SignUpComponent,
        data: { title: 'Sign Up' },
    },
    {
        path: 'password',
        component: ResetPasswordComponent,
        data: { title: 'Password' },
    },
    {
        path: 'lock-screen',
        component: LockScreenComponent,
        data: { title: 'Lock Screen' },
    }
]