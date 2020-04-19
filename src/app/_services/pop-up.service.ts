import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() {
  }

  makeCapitalPopup(data: any): string {

    let badgeClass = 'badge-info';
    let count = data.properties["totalCases"];
    if (count > 0) {
      if (count < 25) {
        badgeClass = 'badge-level3';
      } else if (count >= 25 && count < 50) {
        badgeClass = 'badge-level2';
      } else if (count >= 50 && count < 100) {
        badgeClass = 'badge-level1';
      } else if (count >= 100) {
        badgeClass = 'badge-danger';
      }
    }

    return `<div class="font-weight-bold"><span>District Name: </span>${data.properties["district"]}</div>\
     <div><span>Total cases: </span>\
     <span style="font-size: 1.25em;" class="badge badge-pill ${badgeClass}">${data.properties["totalCases"]}</span></div>\
     <div><span>New cases: </span>${data.properties["newCases"]}</div> `;
  }
}
