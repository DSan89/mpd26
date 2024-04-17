import { Sampler } from "tone";
import * as Tone from "tone";

type IChannel = {
  id: string;
};

type Instrument = {
  chain: Sampler["chain"];
};

export class Channel {
  instrument?: Instrument;
  effects: unknown[] = [];

  loadInstrument(instrument: Instrument) {
    this.instrument = instrument;
  }

  addEffect(effect: unknown) {
    this.effects.push(effect);
  }

  removeEffect(effect: unknown) {
    this.effects = this.effects.filter((e) => e !== effect);
  }

  connectToEffects() {
    const reverb = new Tone.Reverb();
    this.instrument?.chain(reverb, Tone.Destination);
  }
}

export class MpdMixer {
  channels = new Map<string, IChannel>();
}
