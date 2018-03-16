import vsSource from './glsl/vs-source';
import fsSource from './glsl/fs-source';

let GL_TIME_UNIFORM = null;
let GL_RESOLUTION_UNIFORM = null;

function prepareWebGL(gl) {
  const program = gl.createProgram();

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vsSource);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fsSource);
  gl.compileShader(fragmentShader);

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);
  gl.useProgram(program);

  const positionLocation = gl.getAttribLocation(program, 'coordinates');
  const texcoordLocation = gl.getAttribLocation(program, 'texture_coordinates');
  GL_TIME_UNIFORM = gl.getUniformLocation(program, 'u_time');
  GL_RESOLUTION_UNIFORM = gl.getUniformLocation(program, 'u_resolution');

  const vsBuffer = gl.createBuffer();
  const vertices = [
    -1, -1,
    1, -1,
    -1, 1,
    -1, 1,
    1, -1,
    1, 1
  ];

  gl.bindBuffer(gl.ARRAY_BUFFER, vsBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const txBuffer = gl.createBuffer();
  const textureCoordinates = [
    0, 1,
    1, 1,
    0, 0,
    0, 0,
    1, 1,
    1, 0
  ];

  gl.bindBuffer(gl.ARRAY_BUFFER, txBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(texcoordLocation);
  gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
}

let GL_TIME = 0;

function postprocessWebGL(canvas, gl, sourceCanvas, delta) {
  const resolution = [window.innerWidth, window.innerHeight];
  GL_TIME += delta;
  gl.uniform1f(GL_TIME_UNIFORM, GL_TIME / 1000);
  gl.uniform2fv(GL_RESOLUTION_UNIFORM, new Float32Array(resolution));

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceCanvas);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function main(canvas, gl, video) {
  if (!gl) {
    alert('Ваш браузер слишком стар для этого.');
    return;
  }

  let PREVIOUS_T = 0;

  function mainLoop(t) {
    const delta = t - PREVIOUS_T;
    PREVIOUS_T = t;

    // postprocess(canvas, context, overlayCanvas);
    postprocessWebGL(canvas, gl, video, delta);

    requestAnimationFrame(mainLoop);
  }

  prepareWebGL(gl);
  requestAnimationFrame(mainLoop);
}

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
    main(canvas, gl, video);
  });
