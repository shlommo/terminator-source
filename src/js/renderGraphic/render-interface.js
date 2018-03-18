import randomizeText from './utils/rondomize-text';

let it = 0;
function renderWords(ctx, text, fz, width, height) {
  const lineHeight = 16;
  const textBase = height / 4; // базовая высота отрисовки текста
  if (it === text.length) {
    setTimeout(() => {
      ctx.clearRect(0, 0, width / 2, height);
      it = 0;
    }, 1000);
    return false;
  }
  ctx.fillStyle = '#fff';
  ctx.font = `${fz}px Apple`;
  ctx.fillText(text[it], 20, textBase + (lineHeight * it));
  it += 1;

  return true;
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
  analyser.fftSize = 2048;

  const bufferLength = analyser.fftSize;
  const dataArray = new Uint8Array(bufferLength);

  function render() {
    const sampleArr = randomizeText(magicBase);
    renderWords(ctx, sampleArr, fz, canvasWidth, canvasHeight);

    analyser.getByteTimeDomainData(dataArray);
    // console.log(dataArray);

    requestAnimationFrame(render);
  }
  render();
}

export default renderInterface;
