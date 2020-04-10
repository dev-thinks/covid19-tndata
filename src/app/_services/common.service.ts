import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class CommonService {

  // Observable string sources
  private announcedSource = new Subject<string>();
  private confirmedSource = new Subject<string>();

  // Observable string streams
  missionAnnounced$ = this.announcedSource.asObservable();
  missionConfirmed$ = this.confirmedSource.asObservable();

  // Service message commands
  announceMission(fromSource: string) {
    this.announcedSource.next(fromSource);
  }

  confirmMission(asConfirm: string) {
    this.confirmedSource.next(asConfirm);
  }
}