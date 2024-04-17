export class Recorder {
  #stream: MediaStream;
  #mediaRecorder?: MediaRecorder;
  #chunks: Blob[] = [];

  constructor(stream: MediaStream) {
    this.#stream = stream;
  }

  record() {
    if (!this.#stream)
      throw new Error("impossible record audio from microphone");
    this.#mediaRecorder = new MediaRecorder(this.#stream);
    this.#mediaRecorder.start();
    this.#mediaRecorder.ondataavailable = (e) => {
      this.#chunks.push(e.data);
    };
  }

  stop() {
    if (!this.#mediaRecorder)
      throw new Error("impossible stop before start recording");
    this.#mediaRecorder?.stop();
  }

  getUrl() {
    const blob = new Blob(this.#chunks, { type: "audio/ogg; codecs=opus" });
    return URL.createObjectURL(blob);
  }

  static async init() {
    if (navigator.mediaDevices && navigator.mediaDevices?.getUserMedia) {
      console.log("getUserMedia supported.");
      const stream = await navigator.mediaDevices
        .getUserMedia(
          // constraints - only audio needed for this app
          {
            audio: true,
          }
        )
        // Error callback
        .catch((err) => {
          throw new Error(`The following getUserMedia error occurred: ${err}`);
        });

      return new Recorder(stream);
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }
}
