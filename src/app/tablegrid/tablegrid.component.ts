import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-tablegrid',
  templateUrl: './tablegrid.component.html',
  styleUrls: ['./tablegrid.component.scss']
})
export class TablegridComponent implements OnInit {

  private gridApi;
  defaultColDef;
  domLayout;
  private gridColumnApi;
  rowData;

  constructor(private dataService: DataService) {
    this.defaultColDef = {
      enableRowGroup: true,
      enableValue: true,
      sortable: true,
      resizable: false
    };

    this.domLayout = 'autoHeight';
  }

  ngOnInit(): void {
    this.dataService.getGridData().subscribe(data => {
      this.rowData = data;
    });
  }

  columnDefs = [
    { headerName: 'District Name', field: 'name', checkboxSelection: true },
    { headerName: 'Total Case(s)', field: 'totalCases' },
    { headerName: 'Reported Death(s)', field: 'death' },
    { headerName: 'Recovered Case(s)', field: 'recovered' }
  ];

  setAutoHeight() {
    this.gridApi.setDomLayout('autoHeight');
    (<HTMLElement>document.querySelector('#stateGrid')).style.height = '';
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}
