import randomizeText from './utils/rondomize-text';
import renderWords from './modules/render-words';
import renderSpectrum from './modules/render-spectrum';
import renderSquareMap from './modules/render-square-map';

function renderInterface(canvasEl, audioAnalyser) {
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
  analyser.fftSize = 1024;

  const bufferLength = analyser.fftSize;
  const dataArray = new Uint8Array(bufferLength);

  function render() {
    const sampleArr = randomizeText(magicBase);
    renderWords(ctx, sampleArr, fz, canvasWidth, canvasHeight);

    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(analyserStartX, 0, canvasWidth, canvasHeight / 2);
    renderSpectrum(dataArray, ctx, analyserStartX);

    requestAnimationFrame(render);
  }
  render();
  renderSquareMap();
}

export default renderInterface;
