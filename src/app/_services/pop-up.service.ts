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
    return `<div>${data.properties["district"]}</div>`;
  }
}