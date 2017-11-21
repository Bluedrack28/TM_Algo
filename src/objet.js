class Objet {

    /**
    * 
    * @param {*} x 
    * @param {*} y 
    * @param {*} masse 
    * @param {*} speed 
    * @param {*} forces 
    */

    constructor (x, y, masse, speed = new Speed(), forces = []) {
    
        this.x = x;
        this.y = y;
        this.masse = masse;
        this.speed = speed;
        this.forces = forces;
        this.muscleForces = [];
        
        this.typeForces = [this.muscleForces, this.forces, []];

    }

    /**
     * Retourne le vecteur entre deux Objets, utile pour les muscles.
     * Renvoie le vecteur qui commence à l'objet1 et qui finit à l'objet2
     * @param {*} objet1 
     * @param {*} objet2 
     */

    addForce(force, type = 1) {

        this.typeForces[type].push(force);

    }
    
    removeMuscleForce(){

        this.typeForces[0] = [];
        this.typeForces[2] = [];

    }

    getForces(){

        return this.typeForces.forces;

    }

    getResultante() {

        let vecteurResultant = new Vecteur();
        this.typeForces.forEach(type => {

            type.forEach(force => {

                vecteurResultant.composanteX += force.composanteX;
                vecteurResultant.composanteY += force.composanteY;

            });

        });
        
        let resultante = new Force(vecteurResultant.composanteX, vecteurResultant.composanteY);
        return resultante;
    }   

    
    getAcceleration() {

        let resultante = this.getResultante();
        let acc = new Acceleration( resultante.composanteX / this.masse, resultante.composanteY / this.masse);
        return acc;

    }

    getSpeed() {

        return this.speed;

    }

    getIntSpeed(){

        return this.speed.getNorme();

    }

    updateSpeed(){

        let acceleration = this.getAcceleration();
        this.speed.composanteX += acceleration.composanteX;
        this.speed.composanteY += acceleration.composanteY;

    }

    /**
     * Fonction qui update la position des objets.
     * Si l'objet sont arriver au sol alors l'objet arrete de tomber.
     */
    
    updatePosition() {
        
        this.updateSpeed();
        
        this.y += this.speed.composanteY;
        this.x += this.speed.composanteX;
        
    }

    alterate(pourcent) {

    }    
}
class RoundObjet extends Objet{
    
    constructor (x, y, masse, speed = new Speed(), forces = []) {
            
        super(x,y,masse,speed,forces);
        this.raduis = Math.sqrt(masse/(Math.PI));
        //this.raduis = raduis;
    
    }
    
}