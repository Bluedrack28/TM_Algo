class Algorithm {

    constructor(size,clock,nGeneration,){
        this.size = size
        
    }


    generatePool(){
        this.pool = []
        for (let i = 0; i < this.size; i++) {
            
            this.pool.push(Creature.createRandomCreature())
            
        }
    }

    update(){

    }
}