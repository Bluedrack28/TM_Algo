//const Random = require('./random');
//const Creature = require('./creature')
class Ground {

    constructor(level = 300) {

        this.level = level;

    }

}

class Physique {

    constructor(creatures = [], ground = new Ground()){

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
                objet.masse * 1
            ));

        });
    
    }

    updateSystem() {

        this.creatures.forEach(creature => {
            
            creature.update();

            creature.objets.forEach(objet => {
                
                if(objet.y >= this.ground.level){

                    console.log('ca descend')

                    let res = objet.getResultante();
                    objet.addForce(new Force(-res.composanteX, -res.composanteY), 2)

                }2

            });
        });
    }
    

}
//module.exports = Objet;