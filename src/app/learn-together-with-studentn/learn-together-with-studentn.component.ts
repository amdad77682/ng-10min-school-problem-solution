import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JITSI } from '../services/jitsi';
import { PUBNUBService } from '../services/pubnub';

@Component({
  selector: 'app-learn-together-with-studentn',
  templateUrl: './learn-together-with-studentn.component.html',
  styleUrls: ['./learn-together-with-studentn.component.css'],
})
export class LearnTogetherWithStudentnComponent implements OnInit {
  title = 'jitsi';
  roomName: string = '';
  constructor(
    private route: ActivatedRoute,
    private jitsi: JITSI,
    private pubnub: PUBNUBService
  ) {}

  ngOnInit() {
    if (!(window as any).PubNub) {
      console.log('scrript not loaded');
      return;
    }

    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    this.roomName = routeParams.get('videoId')?.toLowerCase() as string;
    console.log(this.roomName);

    this.pubnub.init();
    //init
    this.pubnub.createRoom(this.roomName as string);
    //room create
    this.pubnub.subscribe(this.roomName as string);
    //subscribe
    this.pubnub.addmessageListeners(
      this.messageCallback,
      this.presenseCallBack,
      this.statusCallBack
    );
    //listenner set
    this.messageSend(this.roomName);
    //message send
  }
  messageSend(roomName: string) {
    this.pubnub.messageSend(
      roomName as string,
      (status: string, response: any) => {
        console.log(status, response);
      }
    );
  }
  messageCallback(message: any) {
    // handle message
    const channelName = message.channel;
    const channelGroup = message.subscription;
    const publishTimetoken = message.timetoken;
    const msg = message.message;
    const publisher = message.publisher;
    console.log('message', message);
    //show time
    const unixTimestamp = message.timetoken / 10000000;
    const gmtDate = new Date(unixTimestamp * 1000);
    const localeDateTime = gmtDate.toLocaleString();
  }
  presenseCallBack(event: any) {
    console.log(
      '[PRESENCE: ' + event.action + ']',
      'uuid: ' + event.uuid + ', channel: ' + event.channel
    );
  }
  statusCallBack(event: any) {
    console.log(
      '[STATUS: ' + event.category + ']',
      'connected to channels: ' + event.affectedChannels
    );

    if (event.category === 'PNConnectedCategory') {
      this.allhereNow(event.affectedChannels);
    }
  }
  allhereNow(channels: any) {
    this.pubnub.hereNow(channels, (status: any, response: any) => {
      console.log(status, response);
    });
  }
}
