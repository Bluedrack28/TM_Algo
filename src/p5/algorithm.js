class Algorithm {

    constructor(size,clock){
        this.size = size
        this.clock = clock
        this.previousBestScore = 0
        this.history = []
        this.bestCreatures = []
        this.improvement = 0
        this.time = 0
        this.generation = 0
        this.pool = []
    }


    generatePool(){
        this.generation = 0
        this.history = []
        this.previousBestScore = 0
        this.bestCreatures = []
        this.bestCreature = null
        this.improvement = 0
        this.time = 0
        this.generation = 0
        this.pool = []
        for (let i = 0; i < this.size; i++) {
            this.pool.push(Creature.createRandomCreature())
        }
    }

    update(){
        this.time += 1
        if(this.time >= this.clock){
            this.nextGeneration()
        } else {
            this.pool.forEach(creature => {
                creature.update()
            });
            this.result()
        }
        
    }

    display(){
        strokeWeight(0)
        fill(0)
        textSize(16)
        text('Generation:'+this.generation, 10, 30)
        text('Previous best score:'+this.previousBestScore, 10, 60)
        text('Improvement:'+this.improvement, 10, 90)
        text(this.history, 10, 120)
        let x = this.pool[0].score()
        for (let i = 0; i < x+width; i+=50) {
            strokeWeight(0)
            text(Math.floor(i),i-x+width/2,height-100)
            stroke(0)
            strokeWeight(2)
            line(i-x+width/2,height,i-x+width/2,height-100)
        }
        for (let i = 0; i > x-width; i-=50) {
            strokeWeight(0)
            text(abs(Math.floor(i)),i-x+width/2,height-100)
            fill(0)
            strokeWeight(2)
            line(i-x+width/2,height,i-x+width/2,height-100)
        }

        this.pool.forEach(creature => {
            creature.display(x,width/2)
        });
    }

    nextGeneration(){
        this.time = 0
        this.generation += 1
        this.result()
        this.previousBestScore = abs(Math.floor(this.pool[0].score()))
        this.bestCreatures.push(this.returnBaseCreature(this.pool[0]))
        if(this.bestCreature === null || this.pool[0].score() > this.bestCreature.score ){
            this.bestCreature = this.returnBaseCreature(this.pool[0])
            this.bestCreature.score = this.pool[0].score()
        }
        this.history.push(this.previousBestScore)

        if(this.generation > 1){
            let a = this.history[this.history.length-1],
                b = this.history[this.history.length-2]
            this.improvement = a - b
        }

        let newPool = []
        for (let i = 0; i < this.pool.length; i++) {
            if(i < 0.25 * this.pool.length){
                newPool.push(this.pool[i].alterate(0))
                let clone = this.pool[1].getClone()
                newPool.push(clone.alterate(0.2))
            }else {
                if(newPool.length < this.pool.length){
                    newPool.push(Creature.createRandomCreature())
                }
            }
            
        }
        console.log(this.generation)
        this.pool = newPool
    }

    returnBaseCreature(creature){
        let baseNodes = []
        let baseLinks = []
        let baseMuscles = []
        creature.nodes.forEach(node => {
            let baseNode = {
                id: node.id,
                r: node.r,
                position: [node.originalPosition[0],node.originalPosition[1]],
                mass: node.mass,
                mu: node.mu,
            }
            baseNodes.push(baseNode)
        });
        creature.links.forEach(link => {
            let baseN0
            let baseN1
            baseNodes.forEach(node => {
                if(link.n0.id == node.id) {
                    baseN0 = node.id
                } else if (link.n1.id == node.id){
                    baseN1 = node.id   
                }
            });
            let baseLink = {
                n0: baseN0,
                n1: baseN1,
                k: link.k,
                l: link.l
            }
            baseLinks.push(baseLink)
        });
        creature.muscles.forEach(muscle => {
            let baseN0
            let baseN1
            baseNodes.forEach(node => {
                if(muscle.n0.id == node.id) {
                    baseN0 = node.id
                } else if (muscle.n1.id == node.id){
                    baseN1 = node.id
                }
            });
            let baseMuscle = {
                n0: baseN0,
                n1: baseN1,
                t0: muscle.t0,
                t1: muscle.t1,
                power: muscle.power
            }
            baseMuscles.push(baseMuscle)
        });
        let baseCreature = {
            links: baseLinks,
            muscles: baseMuscles,
            nodes: baseNodes
        }
        return baseCreature
    }

    pourcentAlterate(index){
        return 1 - 1/((1/this.size)*index**2 + 1)
    }

    result(){
        this.pool.sort((a,b)=>{
            return abs(a.score()) - abs(b.score())
        })
        this.pool.reverse()
    }

    getData(){
        let data = {}
        data.history = this.history
        //data.bestCreatures = this.bestCreatures
        data.bestCreature = this.bestCreature
        data.generation = this.generation
        data.clock = this.clock
        data.size = this.size
        return data
    }

    loadJSON(json){
        let data = JSON.parse(json)
        let pool = []
        data.bestCreatures.forEach(creature => {
            let c = new Creature()
            creature.nodes.forEach(node => {
                c.nodes.push(
                    new Node(
                        node.position.x,
                        node.position.y,
                        node.mass,
                        node.mu
                    ))
            })
            creature.links.forEach(link => {
                let n0, n1
                c.nodes.forEach(node => {
                    if(link.n0.id === node.id) n0 = node
                    if(link.n1.id === node.id) n1 = node
                });
                let l = new Link(n0,n1,link.k,link.l)
                c.links.push(l)
            })
            creature.links.forEach(muscle => {
                let n0, n1
                c.nodes.forEach(node => {
                    if(muscle.n0.id === node.id) n0 = node
                    if(muscle.n1.id === node.id) n1 = node
                });
                let m = new Muscle(n0,n1,muscle.t0,muscle.t1,muscle.power)
                c.links.push(m)
            })
            pool.push(creature)
        });
        this.pool = pool
    }
}