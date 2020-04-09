import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from '../_services/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() name: string;

  public chartOptions;
  public highcharts;

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    if (this.name === 'totalCases') {
      this.chartService.getChartCaseData().subscribe(data => {
        this.highcharts = Highcharts;
        this.chartOptions = data;
      });
    }
    else if (this.name === 'deathCases') {
      this.chartService.getChartDeathData().subscribe(data => {
        this.highcharts = Highcharts;
        this.chartOptions = data;
      });
    }
  }
}
