//const Physique = require('./Phyique')

class Algo {
    
    constructor(){
        this.physique = new Physique()
        this.pause = false
        /**
         * Array des creature en fonction de leurs performances.
         */
        this.LIMIT = 10
        this.ALTERATE = 
        this.creatures = []
    }
    /**
     * Mais en place l'algo
     */
    init(nbrCrea){
        this.physique = new Physique()
        for (let i = 0; i < nbrCrea; i++) {
            this.physique.addCreature(Creature.getRandomCreature())
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
            this.physique.updateSystem()
        }
    }
    /**
     * Stop l'algo
     */
    stop(){
        this.pause = true
    }

    /**
     * @returns {Array} Retourne les creatures dans une Array de la meilleur à la moins bonne.
     */
    result(){

        let creatures = []

        this.physique.creatures.forEach((creature, index) => {
            
            /**
             * Cree une copie pour ne pas avoir de probleme dans les scores.
             */
            creatures.push(new Creature(creature.objets,creature.muscles))
            creatures[index].score = creature.getScore()
            //creatures.push(JSON.parse(JSON.stringify(creature)))
        })
        creatures.sort(function(a,b){
            return a.score - b.score
        })
        creatures.reverse()
        return creatures
    }

    /**
     * fonction qui renvoie le poucentage de modifications d'une créature en fonction de son rang
     * @param {*} index le rang de la creature
     * @param {*} length le nombre de creature
     */
    pourcentAlterate(index,length){
        return 1 - 1/((1/length)*index**2+ 1)
    }

    /**
     * 
     * Modfifie un peux la meilleur creature. Tue les moins bonne et en cree de nouvelle.
     */
    newGeneration(){

        //!!! FONCTIONNE PAS ATTENTION
        let results = this.result()
        let length = results.length
        for (let i = 0; i  < results.length; i++) {
            if(i <= this.LIMIT){
                results[i].alterate(this.pourcentAlterate(i,length))
                delete results[i].score
            }else{
                results[i] = Creature.getRandomCreature()
            }
            
        }
        this.physique.creatures = results
        return results

    }
}

//Modules.export = Algo