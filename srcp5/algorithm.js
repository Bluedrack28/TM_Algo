class Algorithm {

    constructor(size,clock,lim0,lim1){
        console.log(this.shift)
        this.size = size
        this.clock = clock
        this.lim0 = lim0
        this.lim1 = lim1
        this.previousBestScore = 0
        this.history = []
        this.bestCreatures = []
        this.improvement = 0
        this.time = 0
        this.generation = 0
        this.pool = []
    }


    generatePool(){
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
            text(Math.floor(i),i-x+this.shift,height-100)
            fill(0)
            strokeWeight(2)
            line(i-x+this.shift,height,i-x+this.shift,height-100)
        }
        for (let i = 0; i > x-width; i-=50) {
            strokeWeight(0)
            text(abs(Math.floor(i)),i-x+this.shift,height-100)
            fill(0)
            strokeWeight(2)
            line(i-x+this.shift,height,i-x+this.shift,height-100)
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
        this.history.push(this.previousBestScore)
        if(this.generation > 1){
            let a = this.history[this.history.length-1],
                b = this.history[this.history.length-2]
            this.improvement = a - b
        }
        this.pool.forEach((creature,index) => {
            creature.alterate(this.pourcentAlterate(index))
        });
    }

    returnBaseCreature(creature){
        let baseNodes = []
        let baseLinks = []
        let baseMuscles = []
        creature.nodes.forEach(node => {
            let baseNode = {
                id: node.id,
                r: node.r,
                originalPosition: [node.originalPosition[0],node.originalPosition[1]],
                mass: node.mass,
                mu: node.mu,
            }
            baseNodes.push(baseNode)
        });
        creature.links.forEach(link => {
            let n0Base
            let n1Base
            baseNodes.forEach(node => {
                if(link.n0.id == node.id) {
                    n0Base = node.id
                } else if (link.n1.id == node.id){
                    n1Base = node.id   
                }
            });
            let baseLink = {
                n0:n0Base,
                n1: n1Base,
                k: link.k,
                l: link.l
            }
            baseLinks.push(baseLink)
        });
        creature.muscles.forEach(muscle => {
            let n0Base
            let n1Base
            baseNodes.forEach(node => {
                if(muscle.n0.id == node.id) {
                    n0Base = node.id
                } else if (muscle.n1.id == node.id){
                    n1Base = node.id
                }
            });
            let baseMuscle = {
                n0: n0Base,
                n1: n1Base,
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
        data.bestCreatures = this.bestCreatures
        saveJSON(data,`data-${year()}${month()}${day()}${hour()}${minute()}${second()}.json`)
    }
}