class Objet {

    /**
    * 
    * @param {*} x 
    * @param {*} y 
    * @param {*} masse 
    * @param {*} speed 
    * @param {*} forces 
    */

    constructor (x, y, masse, coef, speed = new Speed(), forces = []) {
        this.startY = x;
        this.startX = y;
        this.x = x;
        this.y = y;
        this.masse = masse;
        this.coef = coef;
        this.speed = speed;
    
        this.forces = forces;
        this.muscleForces = [];
        

        /**
         * 
         * [0] = muscle
         * [1] = graviter
         * [2] = frottement
         * [3] = forces autres
         * 
         */

        this.typeForces = [this.muscleForces, [], [], this.forces];

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
        this.typeForces[2] = []
    }

    removeForces(){
        
        this.typeForces[0] = [];
        this.typeForces[1] = [];
        this.typeForces[2] = [];
        this.typeForces[3] = [];
        
    }

    getForces(){

        return this.typeForces.forces;

    }

    applyGravity(gAcc){
        this.typeForces[1][0] = new Force(0, this.masse * gAcc.composanteY);
    }

    removeGravity(){
        this.typeForces[1][0] = new Force();
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

        /**
         * A REVOIR !!! 
         */
        this.startX = Logic.alterate(this.startX,pourcent,100,200);
        this.startY = Logic.alterate(this.startY,pourcent,100,200);
        this.masse = Logic.alterate(this.masse,pourcent,500,700);
        this.coef = Logic.alterate(this.coef,pourcent,0,1);
        this.x = this.startX;
        this.y = this.startY;


    }

}
class RoundObjet extends Objet{
    
    constructor (x, y, masse, coef, speed = new Speed(), forces = []) {
            
        super(x,y,masse,coef,speed,forces);
        this.radius = Math.sqrt(masse/(Math.PI));
        //this.radius = radius;
    
    }

    alterate(pourcent){
        super.alterate(pourcent);
        this.radius = Math.sqrt(this.masse/(Math.PI));
    }
    
}