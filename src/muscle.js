class Motion {
    
    /**
     * 
     * @param {*} power La puissance que peut developper le muscle
     * @param {*} duration Et le temps qu'il mets pour faire le mouvements
     */

    constructor(power, duration){

        this.power = power
        this.duration = duration

    }
    alterate(pourcent){
        this.power = Logic.alterate(this.power,pourcent,1,10)
        this.duration = Logic.alterate(this.duration,pourcent,1,10)
    }
    
}

class Muscle {
    
    /**
    * Un muscle connecte toujours deux objets / RoundObjets.
    * @param {*} objet1 Premier Objet ou le muscle est connecter.
    * @param {*} objet2 Deuxieme Objet ou le muscle est connecter.
    * @param {*} t0 temps d'extention
    * @param {*} t1 temps de contration
    * @param {*} motions Est un objet de type Motion qui definie les extention du muscle et ses rétractions. Le muscle aura deux motion un pour la retractation et un autre pour la dilatiation.
    */
 
     constructor(objet1, objet2, k ,t0, t1, longueurMin, longueurMax){
        
         this.objet1 = objet1
         this.objet2 = objet2
         this.k = k
         this.phase = 0 // 0: phase t0, 1:phase t1
         this.timer = 0
         this.t0 = t0
         this.t1 = t1
         this.longueurMin = longueurMin
         this.longueurMax = longueurMax
         this.step = 0
         
     }
     update(){
        this.timer += 1
        let force = this.getForceV2(this.objet1,this.objet2,this.phase)

        if ( this.phase == 0 && this.timer <= this.t0){
            if(this.timer >= this.t0){
                this.phase = 1
            }
        } else if( this.phase == 1 && this.timer <= this.t1){
            if(this.timer >= this.t1){
                this.phase = 0
            }
            
        }
        //!!!!!!
        
        this.objet1.typeForces[0].push(force)
        this.objet2.typeForces[0].push(new Force(-force.composanteX,-force.composanteY))

     }

     getForceV2(objet1,objet2,phase){
        let v = Vecteur.getVecteurBetweenTwoObjets(objet1,objet2),
            a = this.k / v.getNorme()//1/2 * this.k * v.getNorme() ^ 2
        let vForce = Vecteur.produit(v,a)
        if(phase === 0){
            return new Force(vForce.composanteX,vForce.composanteY)
        }else{
            return new Force(vForce.composanteX,vForce.composanteY)
        }
     }
 
     /**
    * Renvoie un vecteur Force pour l'objet1 par rapport au power
    * et est egale a l'inverse pour l'objet2.
    */
    getForce(objet, step){
 
        let facteur = 1 * this.motions[this.step].power / this.motions[this.step].duration
        let vecteur = Vecteur.produit(this.returnVecteur(), facteur)
         
        if (this.objet1 != objet) {
 
            vecteur = Vecteur.getReverse(vecteur)
 
        }
 
        let force
 
        if ( step === 0 ) {
 
            force = new MuscleForce(vecteur.composanteX, vecteur.composanteY)
 
        } else {
 
            force = new MuscleForce(-vecteur.composanteX, -vecteur.composanteY)
         
        }
 
        return force
 
    }
     
     returnVecteur() {
 
        return Vecteur.getVecteurBetweenTwoObjets(this.objet1, this.objet2)
 
     }
 
     setForcesToObjets(){

        if ( this.step === 0 ) {
             
            if( this.returnVecteur().getNorme() < this.longueurMin ){
 
                this.step = 1
                this.objet1.speed = new Speed()
                this.objet2.speed = new Speed()
 
            }else{
 
                this.objet1.typeForces[0].push(this.getForce(this.objet1, this.step))
                this.objet2.typeForces[0].push(this.getForce(this.objet2, this.step))
 
            }
 
         }else{
 
             if(this.returnVecteur().getNorme() > this.longueurMax){
 
                this.step = 0
                this.objet1.speed = new Speed()
                this.objet2.speed = new Speed()
                 
             }else{
 
                this.objet1.typeForces[0].push(this.getForce(this.objet1, this.step))
                this.objet2.typeForces[0].push(this.getForce(this.objet2, this.step))
 
            }
        }
    }
    alterate(pourcent){
        /**
         * A (RE)VOIR !!! 
         */
        this.motions.forEach(motion => {
            motion.alterate(pourcent)
        })
        this.longueurMin = Logic.alterate(this.longueurMin,pourcent,50,70)
        this.longueurMax = Logic.alterate(this.longueurMax,pourcent,70,100)
        
    }

}
class MuscleNew {
    constructor(objet1,objet2,stenght,longueurMax,longueurMin){

    }
}