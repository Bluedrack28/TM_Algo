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
        this.muscleForces = [];
        
        this.typeForces = [this.muscleForces, this.forces,];

    }

    /**
     * Retourne le vecteur entre deux Objets, utile pour les muscles.
     * Renvoie le vecteur qui commence à l'objet1 et qui finit à l'objet2
     * @param {*} objet1 
     * @param {*} objet2 
     */

    addForce(force) {

        this.typeForces[1].push(force);

    }
    
    removeMuscleForce(){

        this.typeForces[0] = [];

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

}

class RoundObjet extends Objet{

    constructor (x, y, masse, raduis, speed = new Speed(), forces = []) {
        
        super(x,y,masse,speed,forces);
        this.raduis = Math.sqrt(masse/(Math.PI));
        //this.raduis = raduis;

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
     * @param {*} motions Est un objet de type Motion qui definie les extention du muscle et ses rétractions. Le muscle aura deux motion un pour la retractation et un autre pour la dilatiation.
     */

    constructor(objet1, objet2, motions = [], longueurMin, longueurMax){

        this.objet1 = objet1;
        this.objet2 = objet2;
        this.motions = motions;
        this.longueurMin = longueurMin;
        this.longueurMax = longueurMax;
        this.step = 0;
        
    }

    /**
     * Renvoie un vecteur Force pour l'objet1 par rapport au power
     * et est egale a l'inverse pour l'objet2.
     */
    getForce(objet, step){

        let facteur = 0.5 * this.motions[this.step].power / this.motions[this.step].duration;
        let vecteur = Vecteur.produit(this.returnVecteur(), facteur);
        
        if (this.objet1 != objet) {

            vecteur = Vecteur.getReverse(vecteur);

        }

        let force;

        if ( step === 0 ) {

            force = new MuscleForce(vecteur.composanteX, vecteur.composanteY);

        } else {

            force = new MuscleForce(-vecteur.composanteX, -vecteur.composanteY);
        
        }

        return force;

    }

    returnVecteur() {

        return Vecteur.getVecteurBetweenTwoObjets(this.objet1, this.objet2);

    }

    setForcesToObjets(){
        if( this.step === 0 ){
            
            if( this.returnVecteur().getNorme() < this.longueurMin ){

                this.step = 1;
                this.objet1.speed = new Speed();
                this.objet2.speed = new Speed();

            }else{

                this.objet1.typeForces[0].push(this.getForce(this.objet1, this.step));
                this.objet2.typeForces[0].push(this.getForce(this.objet2, this.step));

            }

        }else{

            if(this.returnVecteur().getNorme() > this.longueurMax){

                this.step = 0;
                this.objet1.speed = new Speed();
                this.objet2.speed = new Speed();
                
            }else{

                this.objet1.typeForces[0].push(this.getForce(this.objet1, this.step));
                this.objet2.typeForces[0].push(this.getForce(this.objet2, this.step));

            }
        }
    }
    
}

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
        for (let i = 0; i < 4; i++) {

            objet = new RoundObjet( Math.random()*100+100,
                                    Math.random()*100+100,
                                    Math.random()*1000,
                                    Math.random()*50);
            objets.push(objet);
        }
        for (let i = 0; i < objets.length - 1 ; i++) {
            for (let j = i; j < objets.length - 1 ; j++) {
                
                if (Math.random() > 0.3) {
                    muscle = new Muscle(objets[i],
                        objets[j+1],
                        [new Motion(Math.random(),Math.random()),
                        new Motion(Math.random(),Math.random())],
                        70,100);
                    muscles.push(muscle);
                }

            }
        }

        let creature = new Creature(objets, muscles);
        return creature;
    
    }   
    static alterateCreature(){

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


class Ground {

    constructor(level = 0) {

        this.level = level;

    }

}

class Physique {

    constructor(objets = [], ground = new Ground()){

        this.muscles = [];
        this.objets = objets;
        this.ground = ground;

    }
    
    addObjet(objet) {

        this.objets;

    }
    
    getObjets(){

        return this.objets;

    }

    updateSystem() {

        

        this.objets.forEach(objet => {
            objet.update();
        });

    }
    

}
//module.exports = Objet;