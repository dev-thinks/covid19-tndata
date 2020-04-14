import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../_services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  stateTotalCases;
  stateDeathCount;
  stateRecovered;
  subsVar: Subscription;

  showDistrictSummary = false;

  constructor(private dataService: DataService, private commonService: CommonService
    , private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.dataService.getStateData().subscribe(data => {
      this.stateTotalCases = data.totalCases;
      this.stateDeathCount = data.totalDeath;
      this.stateRecovered = data.recovered;
    });
  }

  ngAfterViewInit() {

    this.subsVar = this.commonService.missionAnnounced$.subscribe(
      districtName => {
        if (districtName != null && districtName.length > 0) {
          this.showDistrictSummary = true;

          this.elementRef.nativeElement.querySelector('#tableSummaryGrid').scrollIntoView({ behavior: "smooth" });
        } else {
          this.showDistrictSummary = false;
        }
      });
  }

  ngOnDestroy() {
    if (this.subsVar) {
      this.subsVar.unsubscribe();
    }
  }

}
