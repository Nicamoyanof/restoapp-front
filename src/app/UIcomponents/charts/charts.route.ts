import { Route } from "@angular/router";
import { AreaComponent } from "./area/area.component";
import { BarComponent } from "./bar/bar.component";
import { BubbleComponent } from "./bubble/bubble.component";
import { CandlesticksComponent } from "./candlesticks/candlesticks.component";
import { ColumnComponent } from "./column/column.component";
import { HeatmapComponent } from "./heatmap/heatmap.component";
import { LineComponent } from "./line/line.component";
import { MixedComponent } from "./mixed/mixed.component";
import { TimelineComponent } from "./timeline/timeline.component";
import { BoxplotComponent } from "./boxplot/boxplot.component";
import { TreemapComponent } from "./treemap/treemap.component";
import { PieComponent } from "./pie/pie.component";
import { RadarComponent } from "./radar/radar.component";
import { RadialbarComponent } from "./radialbar/radialbar.component";
import { ScatterComponent } from "./scatter/scatter.component";
import { PolarAreaComponent } from "./polar-area/polar-area.component";

export const CHART_ROUTE: Route[] = [
    {
        path: 'area',
        component: AreaComponent,
        data: { title: 'Area' },
    },
    {
        path: 'bar',
        component: BarComponent,
        data: { title: 'Bar' },
    },
    {
        path: 'bubble',
        component: BubbleComponent,
        data: { title: 'Bubble' },
    },
    {
        path: 'candlestick',
        component: CandlesticksComponent,
        data: { title: 'Candlestick' },
    },
    {
        path: 'column',
        component: ColumnComponent,
        data: { title: 'Column' },
    },
    {
        path: 'heatmap',
        component: HeatmapComponent,
        data: { title: 'Heatmap' },
    },
    {
        path: 'line',
        component: LineComponent,
        data: { title: 'Line' },
    },
    {
        path: 'mixed',
        component: MixedComponent,
        data: { title: 'Mixed' },
    },
    {
        path: 'timeline',
        component: TimelineComponent,
        data: { title: 'Timeline' },
    },
    {
        path: 'boxplot',
        component: BoxplotComponent,
        data: { title: 'Boxplot' },
    },
    {
        path: 'treemap',
        component: TreemapComponent,
        data: { title: 'Treemap' },
    },
    {
        path: 'pie',
        component: PieComponent,
        data: { title: 'Pie' },
    },
    {
        path: 'radar',
        component: RadarComponent,
        data: { title: 'Radar' },
    },
    {
        path: 'radialbar',
        component: RadialbarComponent,
        data: { title: 'Radialbar' },
    },
    {
        path: 'scatter',
        component: ScatterComponent,
        data: { title: 'Scatter' },
    },
    {
        path: 'polararea',
        component: PolarAreaComponent,
        data: { title: 'Polararea' },
    },
    {
        path: 'bar',
        component: BarComponent,
        data: { title: 'Bar' },
    },
]