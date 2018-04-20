class Draw {
    constructor(canvas){

        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
    }


    drawCreature(creature){
        this.drawCreatureCenter(creature)
        creature.muscles.forEach(muscle => {
            
            this.drawVector(muscle.objet1, muscle.objet2)
            
        })
        creature.objets.forEach(objet => {

            ctx.beginPath()
            ctx.fillStyle = 'rgb('+ objet.coef * 255 +','+ objet.coef * 255 + ',' + 255 +')'
            ctx.arc(objet.x, objet.y, objet.radius, 0, 2 * Math.PI)
            ctx.lineWidth = 2
            ctx.stroke()   
            ctx.fill()

        })
        
    }
    drawCreatureCenter(creature){
        
        let x = 0,
            y = 0
        creature.objets.forEach(objet => {
            x += objet.x
            y += objet.y
        })
        x = x / creature.objets.length
        y = y / creature.objets.length
        this.context.beginPath()
        this.context.fillStyle = 'red'
        this.context.arc(x, y, 10, 0, 2 * Math.PI)
        this.context.lineWidth = 2
        this.context.stroke()        
        this.context.fill()

    }
    drawCreatureStatic(creature) {
        creature.muscles.forEach(muscle => {
            
            drawVector(
                {
                    x: muscle.objet1.startX,
                    y: muscle.objet1.startY
                },
                {
                    x: muscle.objet2.startX,
                    y: muscle.objet2.startY
                }
            )
            
        })
        creature.objets.forEach(objet => {
    
            this.context.beginPath()
            this.context.fillStyle = 'rgb('+ objet.coef*255 +','+ objet.coef*255 +','+ 255+')'
            this.context.arc(objet.startX, objet.startY, objet.radius, 0, 2 * Math.PI)
            this.context.lineWidth = 2
            this.context.stroke()        
            this.context.fill()
    
        })
    }
    drawVector(objet1,objet2){
        this.context.beginPath()
        this.context.moveTo(objet1.x, objet1.y)
        this.context.lineTo(objet2.x, objet2.y)
        this.context.lineWidth = 10/(0.1*Vecteur.getVecteurBetweenTwoObjets(objet1,objet2).getNorme()**2+20)+10
        this.context.globalAlpha = 0.4
        this.context.strokeSytle = 'black'
        this.context.stroke()
        this.context.globalAlpha = 1
        this.context.fill
    
    }
    draw(algo,draw) {
        this.context.clearRect(0, 0, canvas.width, canvas.height)
        algo.physique.creatures.forEach(creature => {
            this.drawCreature(creature)
        })
        this.context.beginPath()
        this.context.lineWidth = 1
        this.context.stroke()
        if(draws == true) {
            this.drawCreatureStatic(algo.result()[0])        
        }
        
    }

}