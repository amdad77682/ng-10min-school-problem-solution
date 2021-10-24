import { Component } from '@angular/core';
// import { Pubnub } from 'pubnub-angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-ten-min-s-problem-soliution';

  constructor() {
    // Pubnub.init({
    //   subscribeKey: 'mySubscribeKey',
    //   publishKey: 'myPublishKey',
    //   uuid: 'myUniqueUUID',
    //   ssl: true,
    // });
  }
}
