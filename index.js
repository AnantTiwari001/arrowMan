let canvas = document.getElementsByTagName("canvas")[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d");

document.addEventListener('click',function(){
    for (let i = 0; i < particles.length; i++) {
        particles[i].dx=10
    }
})

function Particle(
  x,
  y,
  dx = 0,
  dy = 0,
  obstracle = ["this.y+100+this.dy<500", 500]
) {
  // obstracle is essentially the condition of object in term of straight
  // lines of x and y axis the ditection of collion causes the dx\dy to
  // drop to zero.Increasement in x or y will only happens if it won't
  // cause it to pass the object or else x\y is added requiredly.
  // [[greater, less],[greater, less]] [[xAxis],[yAxis]]
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  const gravity = 2;
  this.obstracle=obstracle

  this.fall = () => {
    if (eval(obstracle[0])) {
      this.dy += gravity;
      this.y += this.dy;
    } else if(this.dy!=0) {
      this.y=obstracle[1]
      this.dy = 0;
      this.dx=0;
    }
  };
  this.travel = () => {
    this.x += this.dx;
  };
  this.throw = (newdx, newdy) => {
    this.dx = newdx;
    this.dy = newdy;
  };
  this.stop = (y) => {
    this.y = y;
  };
}

const particles = [];
// format for condition of line is as to be executed in the function
// [[this.y+100+this.dy<500,[500]],[[condition],[endPoint]]]
// condition: y<point -->  this.y+dimention+this.dy<poing
for (let i = 0; i < 2; i++) {
  particles.push(
    new Particle(
      Math.random() * canvas.width,
      Math.random() * 500,
    //   10,
    //   5
    )
  );
}
c.fillRect(100,100, 400,400)

c.fillStyle = "red";

function frame() {
  c.clearRect(0, 0, canvas.width, canvas.height);
//   console.log(particles)
  for (let i = 0; i < particles.length; i++) {
    c.fillRect(particles[i].x, particles[i].y, 50, 50);
    particles[i].travel()
    particles[i].fall();
  }
  requestAnimationFrame(frame);
}
frame()
