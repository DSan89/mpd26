import { Sampler } from "../model/Sampler";
import audio1 from "./DreStb11.wav";

function loadAudioAndPlayTest() {
  const sampler = Sampler.create(audio1);
  sampler.player.toDestination();
  sampler.play();
}

loadAudioAndPlayTest();
