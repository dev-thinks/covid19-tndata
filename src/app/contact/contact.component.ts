import { Component, OnInit } from '@angular/core';
import { ContactInfo } from './contact-info';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  model = new ContactInfo('', '', '');
  submitted = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  processForm() {
    console.log(this.model);

    this.submitted = true;
  }

}
