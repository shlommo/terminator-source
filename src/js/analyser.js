const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let source;
const analyser = audioCtx.createAnalyser();

if (navigator.mediaDevices.getUserMedia) {
  const constraints = { audio: true };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
    })
    .catch((err) => {
      console.log(`The following gUM error occured: ${err}`);
    });
} else {
  console.log('getUserMedia not supported on your browser!');
}

export default analyser;
