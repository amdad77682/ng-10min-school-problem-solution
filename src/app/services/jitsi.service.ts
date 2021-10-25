import { Injectable } from '@angular/core';
import { CONFIG } from '../util/config';

@Injectable({
  providedIn: 'root',
})
export class JITSIService {
  connection: any;
  room: any;

  init = (callback: (value: boolean) => void) => {
    (window as any).JitsiMeetJS.init(CONFIG.initOptions);
    this.connection = new (window as any).JitsiMeetJS.JitsiConnection(
      null,
      null,
      CONFIG.minimal_options
    );

    this.connection.addEventListener(
      (window as any).JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
      () => {
        console.log('=====success');
        callback(true);
      }
    );
    this.connection.addEventListener(
      (window as any).JitsiMeetJS.events.connection.CONNECTION_FAILED,
      (err: any) => {
        console.log('=====failed', err);

        callback(false);
      }
    );
    this.connection.addEventListener(
      (window as any).JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
      () => {
        console.log('=====disconnect');
        this.disconnect(callback);
      }
    );
    this.connection.connect();

    (window as any).JitsiMeetJS.setLogLevel(
      (window as any).JitsiMeetJS.logLevels.ERROR
    );
  };
  disconnect = (callback: (value: boolean) => void) => {
    this.connection.removeEventListener(
      (window as any).JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
      () => {
        callback(true);
      }
    );
    this.connection.removeEventListener(
      (window as any).JitsiMeetJS.events.connection.CONNECTION_FAILED,
      () => {
        console.log('failed');
      }
    );
    this.connection.removeEventListener(
      (window as any).JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
      this.disconnect
    );
  };

  createRoom = (
    roomName: string,
    messageCallback: any,
    onUserLeftCallBack: any
  ) => {
    this.room = this.connection.initJitsiConference(
      roomName,
      CONFIG.confOptions
    );
    this.room.on(
      (window as any).JitsiMeetJS.events.conference.CONFERENCE_JOINED,
      this.onConferenceJoined
    );

    this.room.on(
      (window as any).JitsiMeetJS.events.conference.USER_JOINED,
      (id: any, user: any) => {
        // eslint-disable-next-line no-console
        console.log('=====user join', id, user.getDisplayName());
      }
    );
    this.room.on(
      (window as any).JitsiMeetJS.events.conference.USER_LEFT,
      (id: any) => this.onUserLeft(id, onUserLeftCallBack)
    );
    this.room.on(
      (window as any).JitsiMeetJS.events.conference.MESSAGE_RECEIVED,
      messageCallback
    );
  };

  onConferenceJoined = () => {
    // eslint-disable-next-line no-console
    console.log('conference joined!', this.room);
  };

  onUserLeft = (id: any, onUserLeftCallBack: any) => {
    // eslint-disable-next-line no-console
    console.log('user left');
  };
  unload = () => {
    if (this.room) {
      this.room.leave();
    }
    if (this.connection) {
      this.connection.disconnect();
    }
  };
  sendMessage = (message: any) => {
    // eslint-disable-next-line no-console
    console.log('====', message);
    this.room.sendTextMessage(message);
  };
  changeDisplayName = (name: string) => {
    this.room.setDisplayName(name);
  };
}
