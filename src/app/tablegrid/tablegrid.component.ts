import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { CommonService } from '../_services/common.service';

@Component({
  selector: 'app-tablegrid',
  templateUrl: './tablegrid.component.html',
  styleUrls: ['./tablegrid.component.scss']
})
export class TablegridComponent implements OnInit {

  private gridApi;
  defaultColDef;
  domLayout;
  rowClassRules;
  private gridColumnApi;
  rowData;
  getRowStyle;

  constructor(private dataService: DataService, private commonService: CommonService) {
    this.defaultColDef = {
      sortable: true,
      resizable: false
    };

    this.getRowStyle = function (params) {
      if (params.node.rowIndex === 0) {
        return { 'font-weight': 'bolder', 'color': 'red' };
      }
    };

    this.domLayout = 'autoHeight';
  }

  ngOnInit(): void {
    this.dataService.getGridData().subscribe(data => {
      this.rowData = data;
    });
  }

  columnDefs = [
    { headerName: 'District Name', field: 'name', checkboxSelection: params => params.node.rowIndex > 0 },
    { headerName: 'Total Case(s)', field: 'totalCases' },
    { headerName: 'Reported Death(s)', field: 'death' },
    { headerName: 'Recovered Case(s)', field: 'recovered' }
  ];

  setAutoHeight() {
    this.gridApi.setDomLayout('autoHeight');
    (<HTMLElement>document.querySelector('#stateGrid')).style.height = '';
  }

  onSelectionChanged(event) {
    var selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows != null && selectedRows.length > 0) {
      let dtName = selectedRows[0].name;

      this.commonService.announceMission(dtName);
    }
  }

  onGridSizeChanged(params){
    let r = this.gridApi;

    if(this.gridColumnApi) {
        this.gridColumnApi.setColumnVisible("death", true);
        this.gridColumnApi.setColumnVisible("recovered", true);

        if(window.innerWidth < 786) {
          this.gridColumnApi.setColumnVisible("death", false);
          this.gridColumnApi.setColumnVisible("recovered", false);
        }

        params.api.sizeColumnsToFit();
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }

}
