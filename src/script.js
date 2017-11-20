//const Physique = require('./physique.js');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d')
let creature = Creature.getRandomCreature();
let creature1 = Creature.getRandomCreature();
let physique = new Physique();
physique.addCreature(creature);
//console.log(creature);
let objet1 = new RoundObjet(10, 10, 300, 10);
let objet2 = new RoundObjet(200, 100, 100, 10);
let objet3 = new RoundObjet(150, 80, 1000, 10);

let muscle = new Muscle(objet1, objet2, [new Motion(4,4),new Motion(2,4)],20,100);
let muscle1 = new Muscle(objet1, objet3, [new Motion(5,2),new Motion(5,1)],30,100);
let muscle2 = new Muscle(objet2, objet3, [new Motion(3,1),new Motion(3,5)],50,100);

function update() {
    creature.update();
    physique.updateSystem();
    //creature1.update();

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCreature(creature, 'red');
    //drawCreature(creature1, 'blue');


}
function drawCreature(creature,color){

    creature.muscles.forEach(muscle => {
        
                drawVector(muscle.objet1, muscle.objet2);
        
    });
    creature.objets.forEach(objet => {

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(objet.x, objet.y, objet.raduis, 0, 2 * Math.PI)
        ctx.fill();

    });

    
}
function drawVector(objet1,objet2){

    ctx.beginPath();
    ctx.moveTo(objet1.x, objet1.y);
    ctx.lineTo(objet2.x, objet2.y);
    ctx.lineWidth = 10/(0.1*Vecteur.getVecteurBetweenTwoObjets(objet1,objet2).getNorme()^2+10)+10;
    ctx.globalAlpha = 0.4
    ctx.strokeSytle = 'blue'
    ctx.stroke();
    ctx.globalAlpha = 1

}

function loop() {
    
    draw();
    update();
    requestAnimationFrame(loop);
    
}

loop();