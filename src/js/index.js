const player = document.getElementById('player');

navigator.mediaDevices.getUserMedia({ audio: true, video: true })
  .then((stream) => {
    player.src = URL.createObjectURL(stream);
  });
