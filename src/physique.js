//const Random = require('./random')
//const Creature = require('./creature')
class Ground {

    constructor(level = 300) {

        this.level = level

    }

}

class Physique {

    constructor(
        creatures = [],
        ground = new Ground(),
        gAcc = new Acceleration(0,0.0001)
    ){
        this.gAcc = gAcc
        this.creatures = creatures
        this.ground = ground
        this.creatures.forEach(creature => {
            applyGravity(creature)
        })
    }
    
    addCreature(creature) {

        this.creatures.push(creature)

    }
    
    getObjets(){

        return this.objets

    }

    applyGravity(creature){

        creature.objets.forEach(objet => {

            objet.addForce(
                new Force(
                    objet.masse * this.gAcc.composanteX,
                    objet.masse * this.gAcc.composanteY
                ),
                1
            )

        })
    
    }

    updateSystem() {
        
        this.creatures.forEach(creature => {
            
            creature.update()
            this.applyGravity(creature)
            creature.objets.forEach(objet => {
                if(objet.y >= this.ground.level - objet.radius){
                    objet.y = this.ground.level - objet.radius
                    objet.generateContact(0,-1)
                }
            })
        })
    } 
}
//module.exports = Objet