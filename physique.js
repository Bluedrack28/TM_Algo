class Vecteur {

    /**
     * Un vecteur basique avec deux parametres qui definissent le sens, la direction et l'intensité du vecteur.
     * Cette classe est une classe mère pour les classe Speed, Forces, Acceleration.
     * @param {*} x Composante x du vecteur 
     * @param {*} y Composante y du vecteur
     */
    constructor(x = 0, y = 0) {
        this.ComposanteX = x;
        this.ComposanteY = y;
    }

    getComposanteX() {
        return this.ComposanteX;
    }

    getComposanteX() {
        return this.ComposanteX;
    }

    getNorme() {

        return Math.sqrt(Math.pow(this.ComposanteX, 2) + Math.pow(thi.ComposanteY, 2));

    }

    static produitScalaire(vecteur1, vecteur2){

        return vecteur1.ComposanteX * vecteur2.ComposanteX + vecteur1.ComposanteY * vecteur2.ComposanteY;

    }
}

class Forces extends Vecteur {

    constructor(x = 0, y = 0) {

        super(x, y);

    }
        
}

class Acceleration extends Vecteur {

    constructor(x = 0, y = 0) {

        super(x, y);

    }

}

class Speed extends Vecteur {

    constructor(x = 0, y = 0) {

        super(x, y);
        
    }

}

class Objet {

    constructor (x, y, masse, speed = new Speed(), forces = {}) {
        
        this.x = x;
        this.y = y;
        this.masse = masse;
        this.speed = speed;
        this.forces = forces;
    }

    addForce(force) {

        this.forces.push(force);

    }

    getForces(){

        return this.forces;

    }

    getResultante() {

        let vecteurResultant = new Vecteur()
        this.getForces.forEach(force => {

            vecteurResultant.ComposanteX += force.ComposanteX;
            vecteurResultant.ComposanteY += force.ComposanteX;

        });
        let Resultane = new Forces(vecteurResultant.ComposanteX, vecteurResultant.ComposanteY);
    }   
    
    getAcceleration() {

        let Resultante = this.getResultante();
        let Acceleration = new Acceleration( Resultante.ComposanteX * this.masse,
                                             Resultante.ComposanteY * this.masse);
        return Acceleration;

    }

    getSpeed() {

        return this.Speed;

    }

    updateSpeed(){

        let Acceleration = this.getAcceleration();
        this.Speed.ComposanteX += Acceleration.ComposanteX;
        this.Speed.ComposanteY += Acceleration.ComposanteY;
    }

    updatePosition() {
        
    }

}

class RoundObjet extends Objet{

    constructor (x, y, masse, raduis, speed = new Speed(), forces = {}) {
        
        super(x,y,masse,speed,forces);
        this.raduis = raduis;

    }

}

class Motion {
    
    /**
     * 
     * @param {*} power La puissance que peut developper le muscle
     * @param {*} duration Et le temps qu'il mets pour faire le mouvements
     */
    constructor(power, duration){

        this.power = power;
        this.duration = duration;

    }

}

class Muscle {

   
    /**
     * Un muscle connecte toujours deux objets / RoundObjets.
     * @param {*} objet1 Premier Objet ou le muscle est connecter.
     * @param {*} objet2 Deuxieme Objet ou le muscle est connecter.
     * @param {*} motion Est un objet de type Motion qui definie les extention du muscle et ses rétractions.
     */

    constructor(objet1, objet2, motion = new Motion){
        
    }
}


class Physique {

    constructor(objets = {}){
        this.objets = objets;
        
    }
    
    addObjet(objet) {
        this.objets;
    }

    updateSystem() {
        this.objets.forEach(objet => {
            
        });
    }

}

module.exports = Objet;