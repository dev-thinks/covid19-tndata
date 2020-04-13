import { AfterViewInit, Component, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { ShapeService } from '../_services/shape.service';
import { PopUpService } from '../_services/pop-up.service';
import { CommonService } from '../_services/common.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map;
  private info;
  private states;

  constructor(private shapeService: ShapeService, private popupService: PopUpService,
    private commonService: CommonService, private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.initMap();

    this.shapeService.getStateShapes().subscribe(states => {
      this.states = states;
      this.initStatesLayer();
    });

    this.elementRef.nativeElement.querySelector('#resetlink')
      .addEventListener('click', this.resetView.bind(this));
  }

  private initMap(): void {
    this.map = L.map('map', { zoomControl: false, draggable: false }).setView([11, 78.555], 7);

    const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    });
    tiles.addTo(this.map);

    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    this.map.boxZoom.disable();
    this.map.keyboard.disable();
    this.map.dragging.disable();

    this.info = L.control();

    this.info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    this.info.update = function (props) {
      this._div.innerHTML = '<h4>Tamil Nadu Status</h4>' + (props ?
        '<b>' + props.district + '</b><br />Total Cases:<b>' + props.totalCases + '</b> ~~ New Cases: <b>' + props.newCases + '</br>'+
        '<br/><span class="badge badge-primary cursor-pointer" id="resetlink">Reset view</span>'
        : 'Click over a district to see more information. <br/><span class="badge badge-primary cursor-pointer" id="resetlink">Reset view</span>');
    };

    this.info.addTo(this.map);

    L.Legend = L.Control.extend({
      'onAdd': function (map) {

        // add reference to mapinstance
        map.legend = this;

        const v1 = 10;
        const v2 = 11;
        const v3 = 100;

        var container = L.DomUtil.create('div', 'legend');
        if (this.options.content) {
          container.innerHTML = this.options.content;
        }
        return container;
      },
      'onRemove': function (map) {
        delete map.legend;
      },

      'setContent': function (str) {
        this.getContainer().innerHTML = str;
      }
    });

    this.map.addControl(new L.Legend({
      'position': 'topleft',
      'content': this.getLegendContent()
    }));
  }

  private getLegendContent() {
    const v1 = 25;
    const v2 = 50;
    const v3 = 100;

    var container = document.createElement('div');
    container.className = 'legend';

    const labels = [
      '>= ' + v3 + ' cases',
      'Between ' + v2 + ' and ' + v3 + ' cases',
      'Between ' + v1 + ' and ' + v2 + ' cases',
      '< ' + v1 + ' cases'
    ];

    container.innerHTML = '';
    for (let i = labels.length - 1; i >= 0; i--) {
      container.innerHTML += '<span class="legend-text"><i class="legend' + i + '-color"> &nbsp; &nbsp;</i> &nbsp; &nbsp;'
        + labels[i] + '</span><br/>';
    }
    return container.innerHTML;
  }

  private initStatesLayer() {
    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => (this.applyDistrictStyle(feature)),
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e, feature)),
          click: (e) => (this.RefreshOnClick(e, feature))
        })
      )
    });

    this.map.addLayer(stateLayer);
  }

  private applyDistrictStyle(feature) {
    let districtColor = 'default-color';
    let count = feature.properties.totalCases;

    if (count > 0) {
      if (count < 25) {
        districtColor = 'level3-color';
      } else if (count >= 25 && count < 50) {
        districtColor = 'level2-color';
      } else if (count >= 50 && count < 100) {
        districtColor = 'level1-color';
      } else if (count >= 100) {
        districtColor = 'level0-color';
      }
    }

    return {
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8,
      className: districtColor
    };
  }

  private highlightFeature(e, feature) {
    this.elementRef.nativeElement.querySelector('#resetlink')
      .addEventListener('click', this.resetView.bind(this));
  }

  private RefreshOnClick(e, feature) {
    const layer = e.target;

    var content = this.popupService.makeCapitalPopup(feature);
    layer.bindPopup(content);

    this.info.update(feature.properties);

    this.elementRef.nativeElement.querySelector('#resetlink')
      .addEventListener('click', this.resetView.bind(this));

    this.refreshDataForMap(feature.properties.district);
  }

  private refreshDataForMap(dtName) {
    this.commonService.announceMission(dtName);
  }

  resetView(event) {
    this.info.update();

    this.refreshDataForMap('');
  }
}