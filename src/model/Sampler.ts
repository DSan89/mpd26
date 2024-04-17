import * as Tone from "tone";

export class Sampler {
  player: InstanceType<typeof Tone.Player> = new Tone.Player();
  url?: string;

  protected constructor(url?: string) {
    if (url) {
      this.load(url);
      this.setUrl(url);
    }
  }

  setUrl(url: string | undefined) {
    this.url = url;
  }

  load(url: string) {
    this.setUrl(url);
    return this.player?.load(url);
  }

  async play() {
    await Tone.loaded();
    this.player.start();
  }

  clear() {
    this.player?.dispose();
    this.setUrl(undefined);
  }

  static create(url?: string) {
    return new Sampler(url);
  }
}
