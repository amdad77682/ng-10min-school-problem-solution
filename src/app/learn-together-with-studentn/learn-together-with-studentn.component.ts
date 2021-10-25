import { Component, Input, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JITSIService } from '../services/jitsi.service';
import {
  PUBNUBService,
  PUBNUB_PUBLISH_KEY,
  PUBNUB_SUBSCRIBE_KEY,
  USER,
} from '../services/pubnub.service';
import { ToasterService } from '../services/toaster.service';
import { User, UserService } from '../services/users.service';
import { CONFIG } from '../util/config';
import { Ivideo } from '../util/video.model';
import { VIDEOS } from '../util/videos';

@Component({
  selector: 'app-learn-together-with-studentn',
  templateUrl: './learn-together-with-studentn.component.html',
  styleUrls: ['./learn-together-with-studentn.component.css'],
  providers: [UserService],
})
export class LearnTogetherWithStudentnComponent implements OnInit {
  @Input() users$: Observable<User[]>;
  title = 'jitsi';
  roomName: string = '';
  video: Ivideo | undefined;
  safeUrl: SafeResourceUrl = '';
  pubnub: any;
  username = CONFIG.USER.name;
  jitsi: any = new JITSIService();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    console.log('----');

    // First get the video id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const id = routeParams.get('videoId');
    this.roomName = id?.toLowerCase() as string;
    this.video = VIDEOS.find((video) => video.id === id);

    if (!(window as any).PUBNUB) {
      console.log('scrript not loaded');
      return;
    }
    this.pubnubInit();
    // this.conferenceInit();
  }
  pubnubInit() {
    this.pubnub = new (window as any).PUBNUB({
      publish_key: PUBNUB_PUBLISH_KEY,
      subscribe_key: PUBNUB_SUBSCRIBE_KEY,
      uuid: this.username,
      autoNetworkDetection: true, // enable for non-browser environment automatic reconnection
      restore: true, // enable catchup on missed messages
    });
    //init

    this.pubnub.publish({
      channel: this.roomName,
      message: {
        text: 'Hello,hoomans!',
      },
      withPresence: true,
      callback: function (m: any) {
        console.log(m);
      }, //successcallback
      error: function (e: any) {
        console.log(e);
      }, //errorcallback
    });
    //room create

    this.pubnub.subscribe({
      channel: this.roomName,
      withPresence: true,
      callback: this.messageCallback,
      presence: (event: any) => {
        console.log(
          '[PRESENCE: ' + event.action + ']',
          'uuid: ' + event.uuid + ', channel: ' + event.channel
        );
        if (event && event.uuid && event.action) {
          const userObj: User = {
            name: event.uuid,
          };
          this.toaster.show(
            'success',
            event.uuid,
            `${event.uuid} joined`,
            100000000
          );
          this.userService.addUser(userObj);
        }
      },
    });
    this.messageSend();
  }
  messageSend() {
    this.pubnub.publish(
      {
        message: {
          username: this.username,
          text: 'hello from' + this.username,
        },
        channel: this.roomName,
      },
      (status: string, response: any) => {
        console.log(status, response);
      }
    );
  }
  messageCallback = (message: any) => {
    // handle message
    console.log(message);
    this.toaster.show(
      'success',
      'Well done!',
      'This is a success alert',
      10000
    );
  };

  statusCallBack = (event: any) => {
    console.log(
      '[STATUS: ' + event.category + ']',
      'connected to channels: ' + event.affectedChannels
    );

    if (event.category === 'PNConnectedCategory') {
      this.allhereNow(event.affectedChannels);
    }
  };
  allhereNow(channels: any) {
    this.pubnub.hereNow(channels, (status: any, response: any) => {
      console.log(status, response);
    });
  }
}
