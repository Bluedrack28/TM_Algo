class Muscle {

    constructor (objet1, objet2, t0, t1, force, k, l) {
        this.n0 = n0
        this.n1 = n1
        this.t0 = t0
        this.t1 = t1
        this.timer = timer
        this.force = force
        this.k = k
        this.k = l
    }
    update(){
        this.timer += 1
        let v = Vecteur.getVecteurBetweenTwoObjets(objet1,objet2)
        let f = 0.5 * this.k * (v.getNorme() - this.l) ^ 2
        let vUnit = Vecteur.produit(v, 1/v.getNorme() )
        
        let vForce = Vecteur.produit(vUnit,a)
        this.objet1.typeForces[0].push(force)
        this.objet2.typeForces[0].push(new Force(-force.composanteX,-force.composanteY))

    }
}
