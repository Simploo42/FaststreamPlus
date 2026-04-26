import {DefaultPlayerEvents} from '../enums/DefaultPlayerEvents.mjs';
import {EmitterRelay, EventEmitter} from '../modules/eventemitter.mjs';
import {VideoUtils} from '../utils/VideoUtils.mjs';

export default class DirectVideoPlayer extends EventEmitter {
  constructor(client, config) {
    super();
    this.client = client;

    this.video = document.createElement(config?.isAudioOnly ? 'audio' : 'video');

    // ✅ AUTOPLAY CONFIG
    this.video.autoplay = true;
    this.video.muted = true; // required for mobile autoplay
    this.video.playsInline = true;

    // iOS safari compatibility
    this.video.setAttribute('webkit-playsinline', 'true');

    // internal flag for fullscreen (used externally if needed)
    this._fsTriggered = false;
  }

  load() {

  }

  getClient() {
    return this.client;
  }

  async setup() {
    const preEvents = new EventEmitter();
    const emitterRelay = new EmitterRelay([preEvents, this]);
    VideoUtils.addPassthroughEventListenersToVideo(this.video, emitterRelay);

    // ✅ FORCE AUTOPLAY when ready
    this.video.addEventListener('loadeddata', () => {
      this.video.play().catch(() => {});
    });
  }

  getVideo() {
    return this.video;
  }

  async setSource(source) {
    this.source = source;
    this.video.src = source.url;

    // ✅ ensure autoplay triggers on every new source
    this.video.load();

    setTimeout(() => {
      this.video.play().catch(() => {});
    }, 0);
  }

  getSource() {
    return this.source;
  }

  get buffered() {
    return this.video.buffered;
  }

  async play() {
    return this.video.play();
  }

  async pause() {
    return this.video.pause();
  }

  destroy() {
    VideoUtils.destroyVideo(this.video);
    this.video = null;

    this.emit(DefaultPlayerEvents.DESTROYED);
  }

  set currentTime(value) {
    this.video.currentTime = value;
  }

  get currentTime() {
    return this.video.currentTime;
  }

  get readyState() {
    return this.video.readyState;
  }

  get paused() {
    return this.video.paused;
  }

  get levels() {
    return null;
  }

  get duration() {
    return this.video.duration;
  }

  get currentFragment() {
    return null;
  }

  canSave() {
    return {
      cantSave: true,
      canSave: false,
      isComplete: true,
    };
  }

  async saveVideo(options) {

  }

  get volume() {
    return this.video.volume;
  }

  set volume(value) {
    this.video.volume = value;
    if (value === 0) this.video.muted = true;
    else this.video.muted = false;
  }

  get playbackRate() {
    return this.video.playbackRate;
  }

  set playbackRate(value) {
    this.video.playbackRate = value;
  }

  getVideoLevels() {
    return null;
  }

  getAudioLevels() {
    return null;
  }

  getCurrentVideoLevelID() {
    return null;
  }

  getCurrentAudioLevelID() {
    return null;
  }

  setCurrentVideoLevelID(levelID) {
  }

  setCurrentAudioLevelID(levelID) {
  }
}
