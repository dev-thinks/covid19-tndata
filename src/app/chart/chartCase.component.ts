import { Component, Input, OnDestroy, OnInit, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from '../_services/chart.service';
import { CommonService } from '../_services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart-case',
  templateUrl: './chartCase.component.html',
  styleUrls: ['./chartCase.component.scss']
})
export class ChartCaseComponent implements OnInit, OnDestroy {

  public chartOptions;
  public highcharts;
  subsVar: Subscription;

  constructor(private chartService: ChartService, private commonService: CommonService
    , private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.loadChart('');
  }

  ngAfterViewInit() {

    this.subsVar = this.commonService.missionAnnounced$.subscribe(
      districtName => {
        this.loadChart(districtName);
      });
  }

  loadChart(dtName: string) {

    this.chartService.getChartCaseData(dtName).subscribe(data => {
      this.highcharts = Highcharts;
      this.chartOptions = data;
    });

  }

  ngOnDestroy() {
    if (this.subsVar) {
      this.subsVar.unsubscribe();
    }
  }
}
