const options = {
  enableNoAudioDetection: false,
  enableNoisyMicDetection: false,
  testing: {
    p2pTestMode: false,
  },
  useIPv6: false,
  disableAudioLevels: true,
  disableSimulcast: false,
  enableWindowOnErrorHandler: true,
  disableThirdPartyRequests: true,
  enableAnalyticsLogging: false,
  enableRemb: false,
  enableTcc: true,
  resolution: 480,
  openBridgeChannel: true,
  serviceUrl: 'https://beta.meet.jit.si/http-bind',
  hosts: {
    domain: 'beta.meet.jit.si',
    muc: 'conference.beta.meet.jit.si',
  },
  clientNode: 'http://jitsi.org/jitsimeet',
  channelLastN: -1,
  useNicks: false,
  startSilent: false,
  applicationName: 'Jitsi Meet',
  getWiFiStatsMethod: null,
  enableUserRolesBasedOnToken: false,
  disableSuspendVideo: true,
  preferH264: false,
  useStunTurn: true,
  p2p: {
    enabled: false,
    useStunTurn: true,
    stunServers: [{ urls: 'stun:meet-jit-si-turnrelay.jitsi.net:443' }],
  },
  analytics: {},
  deploymentInfo: {},
};
const minimal_options = {
  hosts: {
    domain: 'jitsi-meet.example.com',
    muc: 'conference.jitsi-meet.example.com', // FIXME: use XEP-0030
  },
  bosh: '//jitsi-meet.example.com/http-bind', // FIXME: use xep-0156 for that

  // The name of client node advertised in XEP-0115 'c' stanza
  clientNode: 'http://jitsi.org/jitsimeet',
};
const econnect_options = {
  hosts: {
    domain: 'meet.jit.si',
    muc: 'conference.meet.jit.si',
    focus: 'focus.meet.jit.si',
  },
  externalConnectUrl: 'https://meet.jit.si/http-pre-bind',
  enableP2P: true,
  p2p: {
    enabled: true,
    preferH264: true,
    disableH264: true,
    useStunTurn: true,
  },
  resolution: 1080,
  constraints: {
    video: {
      aspectRatio: 16 / 9,
      height: {
        ideal: 1080,
        max: 1080,
        min: 240,
      },
    },
  },
  requireDisplayName: true,
  useStunTurn: true,
  bosh: `https://meet.jit.si/http-bind?room=liveroom`,
  websocket: 'wss://meet.jit.si/xmpp-websocket',
  clientNode: 'http://jitsi.org/jitsimeet',
};
const initOptions = {
  disableAudioLevels: true,

  // The ID of the jidesha extension for Chrome.
  desktopSharingChromeExtId: 'mbocklcggfhnbahlnepmldehdhpjfcjp',

  // Whether desktop sharing should be disabled on Chrome.
  desktopSharingChromeDisabled: false,

  // The media sources to use when using screen sharing with the Chrome
  // extension.
  desktopSharingChromeSources: ['screen', 'window'],

  // Required version of Chrome extension
  desktopSharingChromeMinExtVersion: '0.1',

  // Whether desktop sharing should be disabled on Firefox.
  desktopSharingFirefoxDisabled: true,
};
const confOptions = {
  openBridgeChannel: true,
};
export const CONFIG = {
  options,
  initOptions,
  confOptions,
  econnect_options,
  minimal_options,
};
