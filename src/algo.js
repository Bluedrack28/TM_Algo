//const Physique = require('./Phyique');

class Algo {
    
    constructor(){
        this.physique = new Physique();
        /**
         * Array des creature en fonction de leurs performances.
         */
        this.creatures = [];
    }
    /**
     * Mais en place l'algo
     */
    init(nbrCrea){

        for (let i = 0; i < nbrCrea; i++) {
            this.physique.addCreature(new Creature.getRandomCreature());
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

        this.physique.updateSystem();

    }
    /**
     * Stop l'alogo
     */
    stop(){

    }

    /**
     * @returns {Array} Retourne les creatures dans une Array de la meilleur à la moins bonne.
     */
    result(){
        this.physique.creatures.forEach(creature => {
            creature.getScore();
        });
        return;
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