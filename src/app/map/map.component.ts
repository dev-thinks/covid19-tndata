import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { ShapeService } from '../_services/shape.service';
import { PopUpService } from '../_services/pop-up.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map;
  private states;

  constructor(private shapeService: ShapeService, private popupService: PopUpService) { }

  ngAfterViewInit(): void {
    this.initMap();

    this.shapeService.getStateShapes().subscribe(states => {
      this.states = states;
      this.initStatesLayer();
    });
  }

  private initMap(): void {
    this.map = L.map('map', { zoomControl: false, draggable: false }).setView([11.1271, 78.6569], 7);

    const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    });

    // additional map layer
    const tiles2 = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });

    tiles.addTo(this.map);

    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    this.map.boxZoom.disable();
    this.map.keyboard.disable();
  }

  private initStatesLayer() {
    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => ({
        weight: 2,
        opacity: 1,
        color: 'blue',
        fillOpacity: 0.8,
        fillColor: '#6DB65B'
      }),
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e, feature)),
          mouseout: (e) => (this.resetFeature(e))
        })
      )
    });

    this.map.addLayer(stateLayer);
  }

  private highlightFeature(e, feature) {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042',
    });

    var content = this.popupService.makeCapitalPopup(feature);

    layer.bindPopup(content);
  }

  private resetFeature(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 2,
      opacity: 1,
      color: 'blue',
      fillOpacity: 0.8,
      fillColor: '#6DB65B'
    });
  }

}