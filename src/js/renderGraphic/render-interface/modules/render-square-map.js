class Point {
  constructor(canvasEl, pos) {
    this.canvas = canvasEl;
    this.vpx = this.canvas.width / 2;
    this.vpy = this.canvas.height / 2;

    this.x = pos.x - this.vpx || 0;
    this.y = pos.y - this.vpy || 0;
    this.z = pos.z || 0;

    this.cX = 0;
    this.cY = 0;
    this.cZ = 0;

    this.xPos = 0;
    this.yPos = 0;
    this.map2D();
  }

  rotateZ(angleZ) {
    const cosZ = Math.cos(angleZ);
    const sinZ = Math.sin(angleZ);
    const x1 = this.x * cosZ - this.y * sinZ;
    const y1 = this.y * cosZ + this.x * sinZ;

    this.x = x1;
    this.y = y1;
  }

  map2D() {
    const scaleX = this.vpx / (this.vpx + this.z + this.cZ);
    const scaleY = this.vpx / (this.vpx + this.z + this.cZ);

    this.xPos = this.vpx + (this.cX + this.x) * scaleX;
    this.yPos = this.vpy + (this.cY + this.y) * scaleY;
  }
}

class Square {
  constructor(canvasEl, z) {
    this.canvas = canvasEl;
    this.ctx = this.canvas.getContext('2d');

    this.z = z || 0;

    this.vpx = this.canvas.width / 2;
    this.vpy = this.canvas.height / 2;

    this.width = this.canvas.width / 6;
    this.height = this.canvas.height / 3;
    this.points = [
      new Point(this.canvas, {
        x: this.vpx - this.width,
        y: this.vpy - this.height,
        z: this.z
      }),
      new Point(this.canvas, {
        x: this.vpx + this.width,
        y: this.vpy - this.height,
        z: this.z
      }),
      new Point(this.canvas, {
        x: this.vpx + this.width,
        y: this.vpy + this.height,
        z: this.z
      }),
      new Point(this.canvas, {
        x: this.vpx - this.width,
        y: this.vpy + this.height,
        z: this.z
      })];
    this.dist = 0;
  }

  update() {
    for (let p = 0; p < this.points.length; p++) {
      this.points[p].rotateZ(0.002);
      this.points[p].z -= 3;
      if (this.points[p].z < -300) {
        this.points[p].z = 2700;
      }
      this.points[p].map2D();
    }
  }

  render() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].xPos, this.points[0].yPos);
    for (let p = 1; p < this.points.length; p++) {
      if (this.points[p].z > -(this.vpx - 50)) {
        this.ctx.lineTo(this.points[p].xPos, this.points[p].yPos);
      }
    }

    this.ctx.closePath();
    this.ctx.stroke();

    this.dist = this.points[this.points.length - 1].z;
  }
}

// Init graphics stuff
const squares = [];
const canvas = document.getElementById('canvasSquare');
const ctx = canvas.getContext('2d');
function render() {
  ctx.clearRect(4, 4, canvas.width - 8, canvas.height - 8);

  squares.sort((a, b) => b.dist - a.dist);

  for (let i = 0, len = squares.length; i < len; i++) {
    squares[i].update();
    squares[i].render();
  }
  requestAnimationFrame(render);
}

function renderSquareMap() {
  for (let i = 0; i < 15; i++) {
    squares.push(new Square(canvas, -300 + (i * 200)));
  }

  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 8;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  render();
}

export default renderSquareMap;
