new p5();
class Individu {
  constructor () {
    this.clock = 0
    this.nodes = [new Particule(1,100,100), new Particle(1,100,100)]
    this.links = [new Link(this.nodes[0],this.nodes[1],10,10,10,100)]
  }
  update(){
  }
}

class Link {
	constructor(n0,n1,k,l){
		this.n0 = n0
		this.n1 = n1
		this.k = k
		this.l = l
	}

	update(){
		let v = this.getVectorUnit(),
			i = 0.5*this.k*(v.mag()-this.l),
			force = v.mult(i)
		this.n1.applyForce(force)
		this.n0.applyForce(force.mult(-1))
	}
	display(){
		strokeWeight(10)
		line(this.n0.position.x,this.n0.position.y,this.n1.position.x,this.n1.position.y)
	}
	getVector(){
		return createVector(this.n1.position.x-this.n0.position.x,this.n1.position.y-this.n0.position.y)
	}
	getVectorUnit(){
		return this.getVector().normalize()
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

let p1 = new Particle(2,100,100)
let p2 = new Particle(2,200,200)
let p3 = new Particle(2,300,100)

let link = new Link(p1,p2,0.1,50)
let link1 = new Link(p1,p3,0.1,50)

function setup () {
	createCanvas(640, 480)  
}

function draw () {
	background(255)
	link.update()
	link1.update()

	p1.update()
	p2.update()
	p3.update()

	link.display()
	link1.display()

	p1.display()
	p2.display()
	p3.display()

}
