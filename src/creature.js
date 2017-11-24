
class Creature {
    
    constructor (objets = [], muscles = []) {
        this.objets = objets;
        this.muscles = muscles
    }
    
    static getRandomCreature () {
        
        let objets = [];
        let objet;
        let muscles = [];
        let muscle;

        for (let i = 0; i < 3; i++) {

            objet = new RoundObjet( Random.getRandomInt(100,200),
                                    Random.getRandomInt(100,200),
                                    Random.getRandomInt(200,1000));
            objets.push(objet);
        }
        
        for (let i = 0; i < objets.length - 1 ; i++) {
            for (let j = i; j < objets.length - 1 ; j++) {
                
                if (Math.random() > 0.2) {
                    muscle = new Muscle(objets[i],
                        objets[j+1],
                        [new Motion(1, 1),
                        new Motion(1, 1)],
                        Random.getRandomInt(10,50), Random.getRandomInt(50,150));
                    muscles.push(muscle);
                }

            }
        }
        
        let creature = new Creature(objets, muscles);
        return creature;
    
    }   

    static alterateCreature(creature, poucent){

        creature.muscle.forEach(muscle => {
            muscle.alterate(pourcent);
        });

        creature.objets.forEach(pbjet => {
            objet.alterate(pourcent);
        });

    }

    update(){
        
        this.objets.forEach(objet => {
            
            objet.updatePosition();
            objet.removeMuscleForce();
            
        });

        this.muscles.forEach(muscle => {

            muscle.setForcesToObjets();
        
        });

        

    }

}