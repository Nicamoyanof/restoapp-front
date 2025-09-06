import { Route } from "@angular/router";
import { GoogleMAPComponent } from "./maps/google-map/google-map.component";
import { VectormapComponent } from "./maps/vectormap/vectormap.component";
import { BasicComponent } from "./tables/basic/basic.component";
import { DatatableComponent } from "./tables/datatable/datatable.component";

export const UI_ROUTE: Route[] = [
        {
                path: 'ui',
                loadChildren: () =>
                        import('../UIcomponents/baseUi/baseui.route').then((mod) => mod.BASICUI_ROUTE),
        },
        {
                path: 'icons',
                loadChildren: () =>
                        import('../UIcomponents/icons/icons.route').then((mod) => mod.ICONS_ROUTE),
        },
        {
                path: 'charts',
                loadChildren: () => import('../UIcomponents/charts/charts.route').then((mod) => mod.CHART_ROUTE)
        },
        {
                path: 'forms',
                loadChildren: () => import('../UIcomponents/forms/forms.route').then((mod) => mod.FORMS_ROUTE)
        },
        {
                path: 'extended',
                loadChildren: () => import('../UIcomponents/advanceUI/advanceui.route').then((mod) => mod.ADVANCEUI_ROUTE)
        },
        {
                path: 'maps/google',
                component: GoogleMAPComponent,
                data: { title: 'Google Maps' },
        },
        {
                path: 'maps/vector',
                component: VectormapComponent,
                data: { title: 'Vector Maps' },
        },
        {
                path: 'tables/basic',
                component: BasicComponent,
                data: { title: 'Basic' },
        },
        {
                path: 'tables/gridjs',
                component: DatatableComponent,
                data: { title: 'Gridjs' },
        },

]