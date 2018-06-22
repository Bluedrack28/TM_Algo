let particles = []

class Individu {
  constructor () {
    this.clock = 0
    this.nodes = [new Particule(1,100,100), new Particle(1,100,100)]
    this.links = [new Link(this.nodes[0],this.nodes[1],10,10,10,100)]
  }
  update(){
    this.links.forEach(link => {
      link.getLength()
    });
    if(c<=100){
      c++
    }else{
      
    }
  }
}

class Link {
  constructor (p1, p2, t1, t2, min, max) {
    this.p1 = p1
    this.p2 = p2
    this.t1 = t1
    this.t2 = t2
    this.min = min
    this.max = max
  }
  getState(c){
   
  }
  getLength(){
    if(state)
  }
}

class Particle {
  constructor (m, x, y) {
    this.mass = m
    this.position = createVector(x, y)
    this.velocity = createVector(0, 0)
    this.acceleration = createVector(0, 0)
  }
  applyForce (force) {
    var f = p5.Vector.div(force, this.mass)
    this.acceleration.add(f)
  }
  update () {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
  }
  display () {
    stroke(0)
    strokeWeight(2)
    fill(255, 127)
    ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16)
  }
  checkEdges () {
    if (this.position.y > (height - this.mass * 8)) {
      // A little dampening when hitting the bottom
      this.velocity.y *= -1
      this.position.y = (height - this.mass * 8)
    }
  }
}

function setup () {
  createCanvas(640, 480)
  
}
function draw () {
  background(255)

  particles.forEach(particule => {
    let gravity = createVector(0, 0.1 * particule.mass)
    particule.applyForce(gravity)
    particule.update()
    particule.display()
    particule.checkEdges()
  })
}
