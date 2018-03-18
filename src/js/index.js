import renderGraphic from './renderGraphic/index';
import analyser from './analyser';

const canvas = document.getElementById('canvasStreaming');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
const video = document.getElementById('player');

const navigatorConfig = {
  audio: false,
  video: {
    width: window.innerWidth,
    height: window.innerHeight
  }
};

navigator.mediaDevices.getUserMedia(navigatorConfig)
  .then((stream) => {
    video.src = URL.createObjectURL(stream);
    renderGraphic(canvas, gl, video, analyser);
  });
