class Algorithm {

    constructor(size,clock,lim0,lim1){
        this.size = size
        this.clock = clock
        this.lim0 = lim0
        this.lim1 = lim1
        this.previousBestScore = 0
        this.history = []
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
        let x = this.pool[0].score()
        for (let i = 0; i < x+width; i+=50) {
            fill(0)
            strokeWeight(2)
            line(i-x+200,height,i-x+200,height-100)
            text(Math.floor(i),i-x+200,height-100)
        }

        this.pool.forEach(creature => {
            creature.display(x)
        });
    }

    nextGeneration(){
        this.time = 0
        this.generation += 1
        let pool = this.result()
        
        this.previousBestScore = Math.floor(this.result()[0].score())
        this.history.push(this.previousBestScore)
        if(this.generation > 1){
            let a = this.history[this.history.length-1],
                b = this.history[this.history.length-2]
                console.log(a,b)
            this.improvement = a - b
        }
        pool.forEach((creature,index) => {
            creature.alterate(this.pourcentAlterate(index))
        });
    }

    pourcentAlterate(index){
        return 1 - 1/((1/this.size)*index**2 + 1)
    }

    result(){
        this.pool.sort(function(a,b){
            return a.score() - b.score()
        })
        this.pool.reverse()
        return this.pool
    }
}