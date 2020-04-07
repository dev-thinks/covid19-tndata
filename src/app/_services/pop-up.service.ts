import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  makeCapitalPopup(data: any): string {
    // var out =[];
    // for (var key in data.properties) {

    //   console.log(key);

    //   out.push(key + ": " + data.properties[key]);
    // }
    // return out.join("<br />");
    return `<div><span>District Name: </span>${data.properties["district"]}</div> <div><span>Total cases: </span>${data.properties["totalCases"]}</div> <div><span>New cases: </span>${data.properties["newCases"]}</div> `;
  }
}