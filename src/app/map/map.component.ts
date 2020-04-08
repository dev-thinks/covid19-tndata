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
  private info;
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
    this.map = L.map('map', { zoomControl: false, draggable: false }).setView([11, 78.6569], 7);

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

    this.info = L.control();

    this.info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    this.info.update = function (props) {
      this._div.innerHTML = '<h4>Tamil Nadu Status</h4>' + (props ?
        '<b>' + props.district + '</b><br />Total Cases:' + props.totalCases + ' ~~ New Cases: ' + props.newCases
        : 'Hover over a district');
    };

    this.info.addTo(this.map);

    L.Legend = L.Control.extend({
      'onAdd': function (map) {

        // add reference to mapinstance
        map.legend = this;

        const v1 = 10;
        const v2 = 11;
        const v3 = 100;

        // create container
        var container = L.DomUtil.create('div', 'legend');

        const labels = [
          '<= ' + v1 + ' cases',
          'Between' + v1 + ' and ' + v2 + ' cases',
          '> ' + v3 + ' cases'
        ];
        const grades = [v1 + 1, v2 + 1, v3];
        container.innerHTML = '<div><b>Legend</b></div>';
        for (let i = 0; i < grades.length; i++) {
          container.innerHTML += '<i style="background:blue"> &nbsp; &nbsp;</i> &nbsp; &nbsp;'
            + labels[i] + '<br/>';
        }

        // if content provided
        if (this.options.content) {
          // set content
          container.innerHTML = this.options.content;

        }
        return container;
      },
      'onRemove': function (map) {

        // remove reference from mapinstance
        delete map.legend;
      },

      // new method for setting innerHTML
      'setContent': function (str) {
        this.getContainer().innerHTML = str;
      }
    });

    this.map.addControl(new L.Legend({
      'position': 'topright',
      'content': this.getLegendContent()
    }));

  }

  private getLegendContent() {
    const v1 = 10;
    const v2 = 11;
    const v3 = 100;

    // create container
    var container = document.createElement('div');
    container.className = 'legend';

    const labels = [
      '<= ' + v1 + ' cases',
      'Between' + v1 + ' and ' + v2 + ' cases',
      '> ' + v3 + ' cases'
    ];
    const grades = [v1 + 1, v2 + 1, v3];
    container.innerHTML = '';
    for (let i = 0; i < grades.length; i++) {
      container.innerHTML += '<i style="background:' + this.getColor(grades[i], v3, v1) + '"> &nbsp; &nbsp;</i> &nbsp; &nbsp;'
        + labels[i] + '<br/>';
    }

    return container.innerHTML;
  }

  private getColor(value, max, min) {
    const val = (value - min) / (max - min);
    const hue = (val * 120).toString(10);
    return ['hsl(', hue, ',100%,50%)'].join('');
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

    this.info.update(feature.properties);
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

    this.info.update();
  }

}