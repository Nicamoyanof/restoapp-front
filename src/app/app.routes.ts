import { Router, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UilayoutComponent } from './uilayout/uilayout.component';
import { ComingsoonComponent } from '@views/otherPages/comingsoon/comingsoon.component';
import { ErrorComponent } from '@views/otherPages/error/error.component';
import { MaintenaceComponent } from '@views/otherPages/maintenace/maintenace.component';
import { AuthenticationService } from '@core/services/auth.service';
import { inject } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full',
    },
    {
        path: '',
        component: LayoutComponent,
        loadChildren: () =>
            import('./views/views.route').then((mod) => mod.VIEWS_ROUTES),
        canActivate: [
            (url: any) => {
                const router = inject(Router)
                const authService = inject(AuthenticationService)
                if (!authService.session) {
                    return router.createUrlTree(['/auth/signin'], {
                        queryParams: { returnUrl: url._routerState.url },
                    })
                }
                return true
            },
        ]
    },
    {
        path: '',
        component: UilayoutComponent,
        loadChildren: () =>
            import('./UIcomponents/ui_route').then((mod) => mod.UI_ROUTE),

    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./views/auth/auth.route').then((mod) => mod.AUTH_ROUTES),
    },
    {
        path: 'pages/comingsoon',
        component: ComingsoonComponent,
        data: { title: 'Coming Soon' }
    },
    {
        path: 'pages/404',
        component: ErrorComponent,
        data: { title: 'Error 400' }
    },
    {
        path: 'pages/maintenance',
        component: MaintenaceComponent,
        data: { title: 'Maintenance' }
    },
];
