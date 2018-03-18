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

export default renderWords;
