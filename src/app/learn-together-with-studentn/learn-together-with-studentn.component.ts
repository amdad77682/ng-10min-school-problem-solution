import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { JITSIService } from '../services/jitsi.service';
import { PUBNUBService } from '../services/pubnub.service';
import { CONFIG } from '../util/config';
import { Ivideo } from '../util/video.model';
import { VIDEOS } from '../util/videos';

@Component({
  selector: 'app-learn-together-with-studentn',
  templateUrl: './learn-together-with-studentn.component.html',
  styleUrls: ['./learn-together-with-studentn.component.css'],
  providers: [JITSIService, PUBNUBService],
})
export class LearnTogetherWithStudentnComponent implements OnInit {
  title = 'jitsi';
  roomName: string = '';
  video: Ivideo | undefined;
  safeUrl: SafeResourceUrl = '';
  pubnub: any = new PUBNUBService();
  jitsi: any = new JITSIService();
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // First get the video id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const id = routeParams.get('videoId');
    this.roomName = id?.toLowerCase() as string;
    this.video = VIDEOS.find((video) => video.id === id);

    if (!(window as any).PubNub) {
      console.log('scrript not loaded');
      return;
    }

    console.log(this.jitsi);
    this.pubnubInit();
    this.conferenceInit();
  }
  pubnubInit() {
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
  }
  conferenceInit() {
    this.jitsi.init((connected: boolean) => {
      console.log('connected', connected);
    });
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
