import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stateTotalCases;
  stateDeathCount;
  stateRecovered;

  showDistrictSummary = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getStateData().subscribe(data => {
      this.stateTotalCases = data.totalCases;
      this.stateDeathCount = data.totalDeath;
      this.stateRecovered = data.recovered;
    });
    // this.showDistrictSummary = true;
  }

}
