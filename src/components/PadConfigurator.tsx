import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Sampler } from "../model/Sampler";
import { Recorder } from "../model/Recorder";
import Waveform from "./Waveform";

type Props = {
  id: string;
};

export default function PadConfigurator(props: Props) {
  const [samplers, setSamplers] = useState<Array<Sampler>>([]);
  const recorder = useRef<Recorder | undefined>(undefined);
  const [noteKey, setNoteKey] = useState<string>();
  const [isNoteKeyEditing, setIsNoteKeyEditing] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  function onKeydown(event: KeyboardEvent) {
    if (isNoteKeyEditing) {
      setNoteKey(event.key);
    } else {
      if (noteKey === event.key) {
        playAudio();
      }
    }
  }

  function toggleNoteKeyEditing() {
    setIsNoteKeyEditing((isNoteKeyEditing) => !isNoteKeyEditing);
  }

  async function record() {
    recorder.current = await Recorder.init();
    recorder.current?.record();
    setIsRecording(true);
  }

  function stopRecord() {
    recorder.current?.stop();
    setSamplers([...samplers, Sampler.create(recorder.current?.getUrl())]);
    setTimeout(
      () =>
        setSamplers([...samplers, Sampler.create(recorder.current?.getUrl())]),
      1
    );
    setIsRecording(false);
  }

  function playAudio() {
    try {
      if (samplers.length === 0)
        throw new Error("impossible reproduce before load audio");
      samplers.forEach((sampler) => {
        sampler.player.toDestination();
        sampler.play();
      });
    } catch (e) {
      alert(e?.message as Error);
    }
  }

  function onLoadFileAudio(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      const url = URL.createObjectURL(files[0]);
      setSamplers([...samplers, Sampler.create(url)]);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
  }, [noteKey, isNoteKeyEditing, samplers]);

  useEffect(() => {
    console.log("mount");
    return () => console.log("unmount");
  }, []);

  return (
    <div>
      <h5>{props.id}</h5>
      <input type="file" id="upload" onChange={onLoadFileAudio} />
      <button onClick={playAudio}>Play</button>
      <br />
      {isRecording ? (
        <button onClick={stopRecord}>Stop</button>
      ) : (
        <button onClick={record}>Record</button>
      )}
      <br />
      <button onClick={toggleNoteKeyEditing}>Map key</button>
      {samplers.length > 0 && <Waveform url={samplers[0].url as string} />}
    </div>
  );
}
