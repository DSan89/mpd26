import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

type WaveformProps = {
  url: string;
};

export default function Waveform(props: WaveformProps) {
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  function createWaveform() {
    const wavesurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#009688",
      progressColor: "#009688",
      cursorColor: "#009688",
      cursorWidth: 0,
      height: 100,
      url: props.url,
      autoplay: true,
    });

    wavesurfer.on("ready", () => {
      wavesurfer.play();
    });

    wavesurferRef.current = wavesurfer;
  }

  useEffect(createWaveform, [props.url]);

  return (
    <div>
      <h1>Waveform</h1>
      <div id="waveform"></div>
    </div>
  );
}
