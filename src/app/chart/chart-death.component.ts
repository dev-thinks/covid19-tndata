import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from '../_services/chart.service';
import { CommonService } from '../_services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart-death',
  templateUrl: './chart-death.component.html',
  styleUrls: ['./chart-death.component.scss']
})
export class ChartDeathComponent implements OnInit, OnDestroy {

  public chartOptions;
  public highcharts;
  subsVar: Subscription;

  constructor(private chartService: ChartService, private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.loadChart();
  }

  ngAfterViewInit() {

    this.subsVar = this.commonService.missionAnnounced$.subscribe(
      districtName => {
        console.log('received death for ' + districtName);

        this.loadChart();
      });

    // this.commonService.missionAnnounced$.next('');
  }

  loadChart() {

    this.chartService.getChartDeathData().subscribe(data => {
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
