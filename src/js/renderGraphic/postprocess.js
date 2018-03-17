function postprocess(_canvas) {
  const ctx = _canvas.getContext('2d');

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = '6px Apple';
  ctx.fillText('asdkfaksdjfksaj', 20, 20);
}

export default postprocess;
