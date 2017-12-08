//const Random = require('./random');
//const Creature = require('./creature')
class Ground {

    constructor(level = 300) {

        this.level = level;

    }

}

class Physique {

    constructor(creatures = [], ground = new Ground(), gAcc = new Acceleration(0,0.8)){
        this.gAcc = gAcc;
        this.creatures = creatures;
        this.ground = ground;
        this.creatures.forEach(creature => {
            applyGravity(creature);
        });
    }
    
    addCreature(creature) {

        this.applyGravity(creature);
        this.creatures.push(creature);

    }
    
    getObjets(){

        return this.objets;

    }

    applyGravity(creature){

        creature.objets.forEach(objet => {

            objet.addForce(new Force(
                0,
                objet.masse * this.gAcc.composanteY
            ), 3);

        });
    
    }

    updateSystem() {
        
        this.creatures.forEach(creature => {
            
            
            creature.update();
            creature.objets.forEach(objet => {
                
                if(objet.y + objet.radius >= this.ground.level){

                    let res = objet.getResultante();
                    
                    //objet.removeForces();

                    if(objet.speed.composanteY >= 0){
                        
                        objet.speed.composanteY *= -objet.coef;
                        objet.speed.composanteX *= -objet.coef;
                        objet.y  = this.ground.level - objet.radius;
                        //objet.removeForces();
                        //console.log(objet);
                        objet.addForce(new Force(res.composanteX*objet.coef , res.composanteX ), 2);                   
                    }

                } else {

                    objet.applyGravity(this.gAcc);
                    
                }

            });
            
        });

    } 

}
//module.exports = Objet;