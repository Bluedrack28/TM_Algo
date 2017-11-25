//const Physique = require('./Phyique');

class Algo {
    
    constructor(){
        this.physique = new Physique();
        this.pause = false;
        /**
         * Array des creature en fonction de leurs performances.
         */
        this.creatures = [];
    }
    /**
     * Mais en place l'algo
     */
    init(nbrCrea){
        this.physique = new Physique();
        for (let i = 0; i < nbrCrea; i++) {
            this.physique.addCreature(Creature.getRandomCreature());
        }

    }
    /**
     * Demarrage de l'algo
     */
    start(){
        
    }

    /**
     * update tout le systeme de test de creature
     */
    update(){
        if(this.pause === false){
            this.physique.updateSystem();
        }
    }
    /**
     * Stop l'alogo
     */
    stop(){
        this.pause = true;
    }

    /**
     * @returns {Array} Retourne les creatures dans une Array de la meilleur à la moins bonne.
     */
    result(){

        let creatures = [];

        this.physique.creatures.forEach(creature => {
            creatures.push({creature : creature , score : creature.getScore()});
        });
        
        

        return creatures;
    }

    /**
     * 
     * Modfifie un peux le meilleur creature. Tue les moins bonne et en cree de nouvelle.
     */
    newGeneration(){
        
        this.creatures.forEach(creature => {
            creature.alterate();
        });

    }
}

//Modules.export = Algo