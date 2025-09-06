import { Component } from '@angular/core';

import 'jsvectormap'
import 'jsvectormap/dist/maps/world'
import 'jsvectormap/dist/maps/world-merc'
import 'jsvectormap/dist/maps/us-merc-en'
import 'jsvectormap/dist/maps/russia'
import 'jsvectormap/dist/maps/italy'
import 'jsvectormap/dist/maps/canada'
import 'jsvectormap/dist/maps/iraq'
import 'jsvectormap/dist/maps/spain'
import 'jsvectormap/dist/maps/us-lcc-en'

import { WorldVectorMapComponent } from '@components/vector-maps/world-vector-map.component'

@Component({
  selector: 'app-vectormap',
  imports: [WorldVectorMapComponent],
  templateUrl: './vectormap.component.html',
  styles: ``
})
export class VectormapComponent {
  worldMapConfig = {
    map: 'world',
    selector: '#world-map-markers',
    zoomOnScroll: false,
    zoomButtons: true,
    markersSelectable: true,
    markers: [
      { name: 'Greenland', coords: [72, -42] },
      { name: 'Canada', coords: [56.1304, -106.3468] },
      { name: 'Brazil', coords: [-14.235, -51.9253] },
      { name: 'Egypt', coords: [26.8206, 30.8025] },
      { name: 'Russia', coords: [61, 105] },
      { name: 'China', coords: [35.8617, 104.1954] },
      { name: 'United States', coords: [37.0902, -95.7129] },
      { name: 'Norway', coords: [60.472024, 8.468946] },
      { name: 'Ukraine', coords: [48.379433, 31.16558] },
    ],
    markerStyle: {
      initial: { fill: '#3e60d5' },
      selected: { fill: '#3e60d56e' },
    },
    regionStyle: {
      initial: {
        fill: '#9ca3af69',
        fillOpacity: 1,
      },
    },
    labels: {
      markers: {
        render: (marker: any) => marker.name,
      },
    },
  }

  worldLineMapConfig = {
    map: 'world_merc',
    selector: '#world-map-markers-line',
    zoomOnScroll: false,
    zoomButtons: false,
    markers: [
      {
        name: 'Greenland',
        coords: [72, -42],
      },
      {
        name: 'Canada',
        coords: [56.1304, -106.3468],
      },
      {
        name: 'Brazil',
        coords: [-14.235, -51.9253],
      },
      {
        name: 'Egypt',
        coords: [26.8206, 30.8025],
      },
      {
        name: 'Russia',
        coords: [61, 105],
      },
      {
        name: 'China',
        coords: [35.8617, 104.1954],
      },
      {
        name: 'United States',
        coords: [37.0902, -95.7129],
      },
      {
        name: 'Norway',
        coords: [60.472024, 8.468946],
      },
      {
        name: 'Ukraine',
        coords: [48.379433, 31.16558],
      },
    ],
    lines: [
      {
        from: 'Canada',
        to: 'Egypt',
      },
      {
        from: 'Russia',
        to: 'Egypt',
      },
      {
        from: 'Greenland',
        to: 'Egypt',
      },
      {
        from: 'Brazil',
        to: 'Egypt',
      },
      {
        from: 'United States',
        to: 'Egypt',
      },
      {
        from: 'China',
        to: 'Egypt',
      },
      {
        from: 'Norway',
        to: 'Egypt',
      },
      {
        from: 'Ukraine',
        to: 'Egypt',
      },
    ],
    regionStyle: {
      initial: {
        stroke: '#9ca3af',
        strokeWidth: 0.25,
        fill: '#9ca3af69',
        fillOpacity: 1,
      },
    },
    markerStyle: {
      initial: { fill: '#9ca3af' },
      selected: { fill: '#9ca3af' },
    },
    lineStyle: {
      animation: true,
      strokeDasharray: '6 3 6',
    },
  }
  indiaMapConfig = {
    map: 'us-icc-en',
    backgroundColor: 'transparent',
    selector: '#india-vector-map',
    regionStyle: {
      initial: {
        fill: '#16a7e9',
      },
    },
  }
  usaMapConfig = {
    backgroundColor: 'transparent',
    regionStyle: {
      initial: {
        fill: '#3e60d5',
      },
    },
  }

  canadaMapConfig = {
    backgroundColor: 'transparent',
    regionStyle: {
      initial: {
        fill: '#1e84c4',
      },
    },
  }

  russiaMapConfig = {
    backgroundColor: 'transparent',
    regionStyle: {
      initial: {
        fill: '#1bb394',
      },
    },
  }

  spainMapConfig = {
    backgroundColor: 'transparent',
    regionStyle: {
      initial: {
        fill: '#23c6c8',
      },
    },
  }

  italyMapConfig = {
    backgroundColor: 'transparent',
    regionStyle: {
      initial: {
        fill: '#47ad77',
      },
    },
  }

  iraqMapConfig = {
    backgroundColor: 'transparent',
    regionStyle: {
      initial: {
        fill: '#f8ac59',
      },
    },
  }
}

