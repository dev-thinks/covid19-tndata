import { Component, OnInit } from '@angular/core';
import { ContactInfo } from './contact-info';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  model = new ContactInfo('', '', '');
  submitted = false;
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  processForm() {
    console.log(this.model);

    this.dataService.addComments(this.model).subscribe(data => {
      this.submitted = true;
    });
    
  }

}
