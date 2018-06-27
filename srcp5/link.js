class Link {
    constructor(n0,n1,k,l){
        this.n0 = n0
        this.n1 = n1
        this.k = k
        this.l = l
    }

    update(){
        
        let v = this.getVectorUnit(),
            i = this.k*(this.getVector().mag()-this.l),
            force = v.mult(i)
        this.n0.applyForce(force)
        this.n1.applyForce(force.mult(-1))
    }

    display(){
        fill(0)
        strokeWeight(10)
        line(this.n0.position.x,this.n0.position.y,this.n1.position.x,this.n1.position.y)
    }

    getVector(){
        return createVector(this.n1.position.x-this.n0.position.x,this.n1.position.y-this.n0.position.y)
    }

    getVectorUnit(){
        return this.getVector().normalize()
    }

    alterate(pourcent){
        this.k = Logic.alterate(this.k,pourcent,2,3)
        this.l = Logic.alterate(this.l,pourcent,50,100)
    }
}
    