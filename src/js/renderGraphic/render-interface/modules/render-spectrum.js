function renderSpectrum(array, ctx, startX) {
  const lineStep = 5;
  const lineHeight = 15;
  for (let i = 0; i < (array.length); i++) {
    const value = array[i];
    const lineX = i * lineStep;
    ctx.fillRect(startX + lineX, 0 + value, 3, lineHeight);
  }
}

export default renderSpectrum;
