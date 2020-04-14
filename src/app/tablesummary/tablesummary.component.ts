import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tablesummary',
  templateUrl: './tablesummary.component.html',
  styleUrls: ['./tablesummary.component.scss']
})
export class TablesummaryComponent implements OnInit, OnDestroy {

  subsVar: Subscription;
  dtName;

  constructor(private commonService: CommonService, private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    this.subsVar = this.commonService.missionAnnounced$.subscribe(
      districtName => {
        this.dtName = districtName;

        if (districtName != null && districtName.length > 0) {
        }

      });
  }

  private resetView() {
    // (<HTMLElement>document.querySelector('#tableSummaryGrid')).style.display = 'none';

    this.commonService.announceMission('');
  }

  ngOnDestroy(): void {
    if (this.subsVar != null) {
      this.subsVar.unsubscribe();
    }
  }

}
