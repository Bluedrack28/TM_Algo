
class Creature {
    
    constructor (objets = [], muscles = []) {
        this.objets = objets;
        this.muscles = muscles;
        
    }
    
    static getRandomCreature () {
        
        let objets = [];
        let objet;
        let muscles = [];
        let muscle;
        
        for (let i = 0; i < 3; i++) {

            objet = new RoundObjet( Random.getRandomInt(50,250),
                                    Random.getRandomInt(50,250),
                                    Random.getRandomInt(300,1000),
                                    Math.random()
                                );
            objets.push(objet);
        }
        
        for (let i = 0; i < objets.length - 1 ; i++) {
            for (let j = i; j < objets.length - 1 ; j++) {
                
                if (Math.random() > 0.2) {
                    muscle = new Muscle(objets[i],
                        objets[j+1],
                        [new Motion(Random.getRandomInt(70,100), Random.getRandomInt(1,10)),
                        new Motion(Random.getRandomInt(70,100), Random.getRandomInt(6,10))],
                        Random.getRandomInt(60,75), Random.getRandomInt(100,160));
                    muscles.push(muscle);
                }

            }
        }
        
        let creature = new Creature(objets, muscles);
        return creature;
    
    }   

    alterate(pourcent){

        creature.muscles.forEach(muscle => {
            muscle.alterate(pourcent);
        });

        creature.objets.forEach(objet => {
            objet.alterate(pourcent);
        });

    }

    getScore(){
        let score = 0;
        this.objets.forEach(objet => {
            score += objet.x;
        });
        score = score / this.objets.length;
        return score;
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