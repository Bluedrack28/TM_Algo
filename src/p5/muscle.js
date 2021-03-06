class Muscle {

	constructor(n0,n1,t0,t1,power){
		this.n0 = n0
		this.n1 = n1
		this.clock = 0
		this.t0 = t0
		this.t1 = t1
		this.power = power
	}

	update(){
		
		if(this.active()){
			let v = this.getVectorUnit()
			let force = v.mult(this.power)
			this.n1.applyForce(force)
			this.n0.applyForce(force.mult(-1))
		}

		this.clock += 1
		if(this.clock >= 100) this.clock = 0
	}
	
	active(){
		if(this.t0 > this.clock && this.t1 > this.clock) {
			return true
		}
		return false
	}

	display(x,shift){
		if(this.active()){
			stroke("#cb3737")
			strokeWeight(20*75/this.power)
			line(this.n0.position.x-x+shift,this.n0.position.y,this.n1.position.x-x+shift,this.n1.position.y)
		} else {
			stroke(0,0,0)
		}
	}

	getVector(){
		return createVector(this.n1.position.x-this.n0.position.x,this.n1.position.y-this.n0.position.y)
	}

	getVectorUnit(){
		return this.getVector().normalize()
	}

	alterate(pourcent){
		this.t0 = Logic.alterate(this.t0,pourcent,0,100)
		this.t1 = Logic.alterate(this.t1,pourcent,0,100)
		this.power = Logic.alterate(this.power,pourcent,75,125)
	}
}