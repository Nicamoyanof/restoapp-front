import { Route } from "@angular/router";
import { RatingsComponent } from "./ratings/ratings.component";
import { SweetalertComponent } from "./sweetalert/sweetalert.component";
import { ScrollbarComponent } from "./scrollbar/scrollbar.component";
import { ToastyfyComponent } from "./toastyfy/toastyfy.component";

export const ADVANCEUI_ROUTE: Route[] = [
    {
        path: 'ratings',
        component: RatingsComponent,
        data: { title: 'Rating' }
    },
    {
        path: 'sweetalert',
        component: SweetalertComponent,
        data: { title: 'Sweetalert' }
    },
    {
        path: 'scrollbar',
        component: ScrollbarComponent,
        data: { title: 'Scrollbar' }
    },
    {
        path: 'toastify',
        component: ToastyfyComponent,
        data: { title: 'Toastyfy' }
    },
]