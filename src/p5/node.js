
class Node {
    
    constructor (x, y, mass, mu) {
        this.id = '_' + Math.random().toString(36).substr(2, 9)
        this.r = 4
        this.originalPosition = [x,y]
		this.position = createVector(x, y)
		this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
        this.mass = mass
        this.mu = mu
	}
	applyForce (force) {
		var f = p5.Vector.div(force, this.mass)
		this.acceleration.add(f)
	}
	update () {
        
        //console.log(-1*this.velocity.x,-1*this.velocity.y)
        
        this.applyForce(createVector(-this.velocity.x*0.3,-this.velocity.y*0.3))
        this.applyForce(createVector(0,2*this.mass))
		this.velocity.add(this.acceleration)
        //this.velocity = this.velocity.mult(0.9)
        
		this.position.add(this.velocity)
        this.acceleration.mult(0)
        this.checkEdges()
        

	}
	display (x,shift) {
		stroke(0)
        strokeWeight(2)
        //colorMode(HSB)
        fill(255,255,255*this.mu)
        colorMode(RGB)
		ellipse(this.position.x-x+shift, this.position.y, this.mass * this.r, this.mass * this.r)
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
        this.applyForce(createVector(fx,fy))
    }

	checkEdges () {
		if (this.position.y > (height - this.mass * this.r/2)) {
            this.velocity.x *= this.mu
            if(this.velocity.y < 1) this.velocity.y = 0
            this.velocity.y *= -this.mu
            this.position.y = (height - this.mass * this.r/2)
		}
    }
    alterate(pourcent){
        this.position = createVector(
            Logic.alterate(this.originalPosition[0],pourcent,-100,100),
            Logic.alterate(this.originalPosition[1],pourcent,-100,100)
        )
        this.mass = Logic.alterate(this.mass,pourcent,7,14)
        this.mu = Logic.alterate(this.mu,pourcent,0,1)
    }
}
