import prepareWebGL from './prepare-webgl';
import renderInterface from './render-interface';
import postprocessWebGL from './postprocess-webgl';


const canvasBackLayer = document.getElementById('canvasBackLayer');

function renderGraphic(canvas, gl, video) {
  let PREVIOUS_T = 0;

  if (!gl) {
    alert('Ваш браузер слишком стар для этого.');
    return;
  }

  renderInterface(canvasBackLayer);

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
