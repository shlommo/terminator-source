import UniformModel from './data/uniform-model';

let GL_TIME = 0;
const uniforms = UniformModel;

function postprocessWebGL(canvas, gl, sourceCanvas, delta) {
  const resolution = [window.innerWidth, window.innerHeight];
  GL_TIME += delta;
  gl.uniform1f(uniforms.time, GL_TIME / 1000);
  gl.uniform2fv(uniforms.resolution, new Float32Array(resolution));

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceCanvas);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

export default postprocessWebGL;
