const player = document.getElementById('player');
const canvas = document.getElementById('canvasForVideo');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

navigator.mediaDevices.getUserMedia({ audio: true, video: true })
  .then((stream) => {
    player.src = URL.createObjectURL(stream);
  });

function draw(video, canvasContext) {
  canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(() => {
    draw(video, canvasContext);
  });
}

draw(player, ctx);
