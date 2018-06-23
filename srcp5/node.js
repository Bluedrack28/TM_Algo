class Node {
    constructor (x, y, m) {
		this.position = createVector(x, y)
		this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
        this.mass = m
	}
	applyForce (force) {
		var f = p5.Vector.div(force, this.mass)
		this.acceleration.add(f)
	}
	update () {
		this.checkEdges()
		this.velocity.add(this.acceleration)
		this.velocity = this.velocity.mult(0.3)
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