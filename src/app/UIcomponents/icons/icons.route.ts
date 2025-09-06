import { Route } from "@angular/router";
import { BoxiconsComponent } from "./boxicons/boxicons.component";
import { SolariconsComponent } from "./solaricons/solaricons.component";

export const ICONS_ROUTE: Route[] = [
    {
        path: 'boxicons',
        component: BoxiconsComponent
    },
    {
        path: 'solar',
        component: SolariconsComponent
    }
]
