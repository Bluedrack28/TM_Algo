class Node {
    constructor (x, y, m, mu) {
		this.position = createVector(x, y)
		this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
        this.mass = m
        this.mu = mu
	}
	applyForce (force) {
		var f = p5.Vector.div(force, this.mass)
		this.acceleration.add(f)
	}
	update () {
        this.applyForce(createVector(0,1))
		this.velocity.add(this.acceleration)
        //this.velocity = this.velocity.mult(0.9)
        
		this.position.add(this.velocity)
        this.acceleration.mult(0)
        this.checkEdges()

	}
	display () {
		stroke(0)
		strokeWeight(2)
		fill(this.mu*255)
		ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16)
    }

    generateContact(nx,ny){
        let vNormal, fNormal, fx, fy
        let vx = this.velocity.x
        let vy = this.velocity.y
        vNormal = vx * nx + vy * ny
        fNormal = -(1 + this.mu) * vNormal * this.mass / 1
        fx = fNormal * nx
        fy = fNormal * ny
        this.applyForce(createVector(fx,fy))
    }

    generateFriction(nx,ny){
        let n = createVector(nx,ny)
        n = n.rotate(PI/2)
        let fx = -this.acceleration*this.mass*this.mu*nx
        let fy = -this.acceleration*this.mass*this.mu*ny
        let f = n.normalize().mult(this.acceleration.mag()*this.mass*this.mu)
        //console.log(f)
        this.applyForce(createVector(fx,fy))
    }

	checkEdges () {
		if (this.position.y > (height - this.mass * 8)) {
            // A little dampening when hitting the bottom
            this.generateFriction(0,-1)
            this.generateContact(0,-1)
            this.position.y = (height - this.mass * 8)
		}
	}
}