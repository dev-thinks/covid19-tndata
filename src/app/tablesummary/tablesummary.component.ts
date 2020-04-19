import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from '../_services/common.service';
import {Subscription} from 'rxjs';
import {DataService} from '../_services/data.service';

@Component({
  selector: 'app-tablesummary',
  templateUrl: './tablesummary.component.html',
  styleUrls: ['./tablesummary.component.scss']
})
export class TablesummaryComponent implements OnInit, OnDestroy {

  subsVar: Subscription;
  dtName;

  districtData = {
    totalCases: 0, newCases: 0,
    totalRecovered: 0, newRecovered: 0,
    totalDeath: 0, newDeath: 0
  };

  constructor(private commonService: CommonService, private elementRef: ElementRef
    , private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    this.subsVar = this.commonService.missionAnnounced$.subscribe(
      districtName => {
        this.dtName = districtName;

        if (districtName != null && districtName.length > 0) {
          this.dataService.getGridSummaryData(districtName).subscribe(data => {
            this.districtData = data;
            console.log(this.districtData);
          });
        }
      });
  }

  resetView() {
    this.commonService.announceMission('');
  }

  ngOnDestroy(): void {
    if (this.subsVar != null) {
      this.subsVar.unsubscribe();
    }
  }

}
