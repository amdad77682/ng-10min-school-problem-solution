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
  title = 'jitsi';
  roomName: string = '';
  video: Ivideo | undefined;
  safeUrl: SafeResourceUrl = '';
  pubnub: any;
  username = CONFIG.USER.name;
  jitsi: any = new JITSIService();
  teacher_mode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    // console.log(this.userService.getUsers());

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
  }
  pubnubInit = () => {
    this.pubnub = new (window as any).PUBNUB({
      publish_key: PUBNUB_PUBLISH_KEY,
      subscribe_key: PUBNUB_SUBSCRIBE_KEY,
      uuid: this.username,
      autoNetworkDetection: true, // enable for non-browser environment automatic reconnection
      restore: true, // enable catchup on missed messages
    });

    this.pubnub.publish({
      channel: this.roomName,
      message: {
        username: this.username,
        text: 'I am joinnig the room',
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
        if (event && event.uuid && event.action) {
          if (event.uuid !== this.username) {
            const userObj: User = {
              name: event.uuid,
            };
            const user = event.uuid == this.username ? 'You' : event.uuid;
            this.toaster.show(
              'success',
              user,
              `${user} joined to the room`,
              10000
            );
            this.userService.addUser(userObj);
          }
        }
      },
    });
    // this.messageSend();
  };
  gotoTeacherMode = () => {
    this.pubnub.publish(
      {
        message: {
          mode: this.teacher_mode ? 'student' : 'teacher',
          username: this.username,
          text: `${this.username} ${
            this.teacher_mode
              ? 'going for student mode'
              : ' going for teacher mode'
          }`,
        },
        channel: this.roomName,
      },
      (status: string, response: any) => {
        console.log(status, response);
      }
    );
    this.teacher_mode = !this.teacher_mode;
  };
  messageSend = () => {
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
  };
  messageCallback = (message: any) => {
    if (message.username !== this.username)
      this.toaster.show('success', `${message.username}`, message.text, 10000);
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
  allhereNow = (channels: any) => {
    this.pubnub.hereNow(channels, (status: any, response: any) => {
      console.log(status, response);
    });
  };
}
