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