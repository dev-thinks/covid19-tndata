import { Component, OnInit } from '@angular/core';

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

  constructor() {
    this.defaultColDef = {
      enableRowGroup: true,
      enableValue: true,
      sortable: true,
      resizable: false
    };

    this.domLayout = 'autoHeight';
  }

  ngOnInit(): void {
  }

  columnDefs = [
    { headerName: 'Make', field: 'make', checkboxSelection: true },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' }
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  setAutoHeight() {
    this.gridApi.setDomLayout('autoHeight');
    (<HTMLElement>document.querySelector('#myGrid')).style.height = '';
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}
