class Algorithm {

    constructor(size,clock){
        this.size = size
        this.clock = clock
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
        }
        
    }

    display(){
        textSize(32);
        text('Generation:'+this.generation, 10, 30);
        this.pool.forEach(creature => {
            creature.display()
        });
    }

    nextGeneration(){
        this.time = 0
        this.generation += 1
        let nextPool = this.result()
        pool.forEach((creature,index) => {
            creature.alterate(this.pourcentAlterate(index))
        })
        this.pool = nextPool
    }

    pourcentAlterate(index){
        return 1 - 1/((1/this.size)*index**2+ 1)
    }

    result(){
        this.pool.sort(function(a,b){
            return a.score() - b.score()
        })
        this.pool.reverse()
        return this.pool
    }
}