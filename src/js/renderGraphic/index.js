import prepareWebGL from './prepare-webgl';
import postprocessWebGL from './postprocess-webgl';

const canvasBackLayer = document.getElementById('canvasBackLayer');
const backLayerCtx = canvasBackLayer.getContext('2d');

function renderGraphic(canvas, gl, video) {
  let PREVIOUS_T = 0;

  if (!gl) {
    alert('Ваш браузер слишком стар для этого.');
    return;
  }

  function mainLoop(t) {
    const delta = t - PREVIOUS_T;
    PREVIOUS_T = t;

    // postprocess(canvas, context);
    backLayerCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
    postprocessWebGL(canvas, gl, canvasBackLayer, delta);

    requestAnimationFrame(mainLoop);
  }

  prepareWebGL(gl);
  requestAnimationFrame(mainLoop);
}

export default renderGraphic;
