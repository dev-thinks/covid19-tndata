import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tamilnadu-maps';

  constructor(public router: Router) {
    // subscribe to router events and send page views to Google Analytics
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        try {
          ga('set', 'page', event.urlAfterRedirects);
          ga('send', 'pageview');
        } catch (e) {
        }
      }
    });
  }
}
