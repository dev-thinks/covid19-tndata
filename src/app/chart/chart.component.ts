import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from '../_services/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public chartOptions;
  public highcharts;

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartService.getChartCaseData().subscribe(data => {
      this.highcharts = Highcharts;
      this.chartOptions = data;
    });
  }
}
