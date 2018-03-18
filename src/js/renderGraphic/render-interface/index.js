import randomizeText from './utils/rondomize-text';
import renderWords from './modules/render-words';
import renderSpectrum from './modules/render-spectrum';
import renderSquareMap from './modules/render-square-map';

function renderInterface(canvasEl, audioAnalyser, audioData) {
  const canvas = canvasEl;
  const ctx = canvas.getContext('2d');
  const demo = document.querySelector('.demo');
  canvas.width = demo.offsetWidth;
  canvas.height = demo.offsetHeight;
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const fz = 8; // font-size
  const magicBase = 22;

  const analyser = audioAnalyser;
  const analyserStartX = canvasWidth / 1.5;

  function render() {
    const sampleArr = randomizeText(magicBase);
    renderWords(ctx, sampleArr, fz, canvasWidth, canvasHeight);

    analyser.getByteFrequencyData(audioData);
    ctx.clearRect(analyserStartX, 0, canvasWidth, canvasHeight / 2);
    renderSpectrum(audioData, ctx, analyserStartX);

    requestAnimationFrame(render);
  }
  render();
  renderSquareMap();
}

export default renderInterface;
