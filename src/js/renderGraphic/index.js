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

  renderInterface(canvasBackLayer, audioAnalyser);

  function mainLoop(t) {
    const delta = t - PREVIOUS_T;
    PREVIOUS_T = t;
    postprocessWebGL(canvas, gl, video, delta);
    requestAnimationFrame(mainLoop);
  }

  prepareWebGL(gl);
  requestAnimationFrame(mainLoop);
}

export default renderGraphic;
