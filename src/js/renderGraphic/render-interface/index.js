import randomizeText from './../utils/rondomize-text';
import renderWords from './render-words';

function renderSpectrum(array, ctx, startX) {
  const lineStep = 5;
  const lineHeight = 15;
  for (let i = 0; i < (array.length); i++) {
    const value = array[i];
    const lineX = i * lineStep;
    ctx.fillRect(startX + lineX, 0 + value, 3, lineHeight);
  }
}

function renderInterface(canvasEl, audioAnalyser) {
  const canvas = canvasEl;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const fz = 8; // font-size
  const magicBase = 22;
  // const timestamp = Date.now();

  const analyser = audioAnalyser;
  const analyserStartX = canvasWidth / 1.5;
  analyser.fftSize = 1024;

  const bufferLength = analyser.fftSize;
  const dataArray = new Uint8Array(bufferLength);

  function render() {
    const sampleArr = randomizeText(magicBase);
    renderWords(ctx, sampleArr, fz, canvasWidth, canvasHeight);

    // analyser.getByteTimeDomainData(dataArray);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(analyserStartX, 0, canvasWidth, canvasHeight / 2);
    renderSpectrum(dataArray, ctx, analyserStartX);

    requestAnimationFrame(render);
  }
  render();
}

export default renderInterface;
