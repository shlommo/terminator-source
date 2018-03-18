import renderInterface from './render-interface/index';
import prepareWebGL from './render-video-stream/prepare-webgl';
import postprocessWebGL from './render-video-stream/postprocess-webgl';


const canvasBackLayer = document.getElementById('canvasBackLayer');

function renderGraphic(canvas, gl, video, audioAnalyser) {
  let PREVIOUS_T = 0;

  if (!gl) {
    alert('Ваш браузер слишком стар для этого.');
    return;
  }

  const analyser = audioAnalyser;
  analyser.fftSize = 512;
  const bufferLength = analyser.fftSize;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);

  renderInterface(canvasBackLayer, analyser, dataArray);

  function mainLoop(t) {
    const delta = t - PREVIOUS_T;
    PREVIOUS_T = t;

    analyser.getByteFrequencyData(dataArray);

    postprocessWebGL(canvas, gl, video, delta, dataArray);
    requestAnimationFrame(mainLoop);
  }

  prepareWebGL(gl);
  requestAnimationFrame(mainLoop);
}

export default renderGraphic;
