import renderGraphic from './renderGraphic/index';

const canvas = document.getElementById('canvasForVideo');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
const video = document.getElementById('player');

const navigatorConfig = {
  audio: true,
  video: {
    width: canvas.width,
    height: canvas.height
  }
};

navigator.mediaDevices.getUserMedia(navigatorConfig)
  .then((stream) => {
    video.src = URL.createObjectURL(stream);
    renderGraphic(canvas, gl, video);
  });
