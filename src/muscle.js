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