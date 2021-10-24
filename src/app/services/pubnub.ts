import { Injectable } from '@angular/core';
const number = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
const USER = {
  name: `testuser ${number}`,
  id: `testuser${number}@jitsi-meet.example.com`,
  password: `password${number}`,
};
@Injectable({
  providedIn: 'root',
})
export class PUBNUBService {
  pubnub: any;
  room: any;
  messages = [];

  init = () => {
    this.pubnub = new (window as any).PubNub({
      publish_key: 'pub-c-f672051b-8cea-4297-97c2-2bd77f80690d',
      subscribe_key: 'sub-c-cfe2e1f2-3339-11ec-b886-526a8555c638',
      uuid: USER.name,
      autoNetworkDetection: true, // enable for non-browser environment automatic reconnection
      restore: true, // enable catchup on missed messages
    });
  };

  createRoom = (roomName: string) => {
    this.pubnub.publish({
      channel: roomName,
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
  };
  subscribe = (roomName: string) => {
    this.pubnub.subscribe({
      channel: [roomName],
      withPresence: true,
      callback: function (m: any) {
        console.log(m);
      },
      presence: function (m: any) {
        console.log(m.occupancy);
      },
    });
  };

  messageSend = (
    roomName: string,
    callback: (status: string, response: any) => void
  ) => {
    this.pubnub.publish(
      {
        message: {
          username: 'test',
          text: 'hello message',
        },
        channel: roomName,
      },
      callback
    );
  };

  addmessageListeners = (
    messageCallBack: (message: any) => void,
    presenseCallBack: (event: any) => void,
    statusCallBack: (event: any) => void
  ) => {
    this.pubnub.addListener({
      message: messageCallBack,
      presence: presenseCallBack,
      status: statusCallBack,
    });
  };
  hereNow(channels: any, callback: any) {
    for (let i in channels) {
      var channel = channels[i];
      this.pubnub.hereNow(
        {
          channel: channel,
          includeUUIDs: true,
          includeState: true,
        },
        callback
      );
    }
  }
}
