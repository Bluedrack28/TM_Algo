class Vecteur {

    /**
     * Un vecteur basique avec deux parametres qui definissent le sens, la direction et l'intensité du vecteur.
     * Cette classe est une classe mère pour les classe Speed, Forces, Acceleration.
     * @param {*} x Composante x du vecteur 
     * @param {*} y Composante y du vecteur
     */

    constructor(x = 0, y = 0) {

        this.composanteX = x;
        this.composanteY = y;

    }

    getComposanteX() {
        return this.composanteX;
    }

    getComposanteX() {
        return this.composanteX;
    }

    getNorme() {

        return Math.sqrt(Math.pow(this.composanteX, 2) + Math.pow(this.composanteY, 2));

    }

    /**
     * Methode static qui renvoie le vecteur inverse de l'originale.
     */

    static getReverse(vecteur){
        return new Vecteur(-vecteur.composanteX, -vecteur.composanteY);
    }

    static getVecteurBetweenTwoObjets(objet1, objet2){
        
        let composanteX = objet2.x - objet1.x;
        let composanteY = objet2.y - objet1.y;
        return new Vecteur(composanteX, composanteY);

    }

    static produit(vecteur, number){
        let composanteX = vecteur.composanteX * number;
        let composanteY = vecteur.composanteY * number;
        return new Vecteur(composanteX, composanteY);
    }

    static produitScalaire(vecteur1, vecteur2){

        return vecteur1.composanteX * vecteur2.composanteX + vecteur1.composanteY * vecteur2.composanteY;

    }
}

class Force extends Vecteur {

    constructor(x = 0, y = 0) {

        super(x, y);

    }   
        
}

class MuscleForce extends Force {

    constructor(x = 0, y = 0, id = 1) {
        super(x, y);
        this.id = id;
        
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

    }

    /**
     * Retourne le vecteur entre deux Objets, utile pour les muscles.
     * Renvoie le vecteur qui commence à l'objet1 et qui finit à l'objet2
     * @param {*} objet1 
     * @param {*} objet2 
     */
    addForce(force) {

        this.forces.push(force);

    }
    
    removeForceByID(id) {
        
        this.forces.forEach((force,index) => {
            
            if(force.id === id){
                this.forces.splice(index,1);
            }
        });
    }

    getForces(){

        return this.forces;

    }

    getResultante() {

        let vecteurResultant = new Vecteur()

        this.forces.forEach(force => {
            vecteurResultant.composanteX += force.composanteX;
            vecteurResultant.composanteY += force.composanteY;

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

    updatePosition() {

        this.updateSpeed();
        this.x += this.speed.composanteX;
        this.y += this.speed.composanteY;

    }

}

class RoundObjet extends Objet{

    constructor (x, y, masse, raduis, speed = new Speed(), forces = []) {
        
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

        this.objet1 = objet1;
        this.objet2 = objet2;
        this.motion = motion;
        this.id = 1;
    }

    /**
     * Renvoie un vecteur Force pour l'objet1 par rapport au power
     * et est egale a l'inverse pour l'objet2.
     */
    getForces(){
        let vecteur = Vecteur.produit(Vecteur.getVecteurBetweenTwoObjets(objet1,objet2), this.motion.power)
        let force = new MuscleForce(vecteur.composanteX, vecteur.composanteY);
        
        return force;
    }

    setForcesToObjets(){
        this.objet1.removeForceByID(this.id);
        this.objet2.removeForceByID(this.id);
        let force = this.getForces();
        this.objet1.addForce(force);
        let force2 = new MuscleForce(Vecteur.getReverse(force).composanteX,Vecteur.getReverse(force).composanteY);
        this.objet2.addForce(force2);
    }
    
}

class Ground {

    constructor(level) {

        this.level = level;

    }

}

class Physique {

    constructor(objets = []){
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
//module.exports = Objet;