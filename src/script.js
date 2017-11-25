//const Physique = require('./physique.js');
let canvas = document.getElementById('canvas');
let canvas1 = document.getElementById('canvas1');
let stopRestartB = document.getElementById('stop');
let startB = document.getElementById('start');
let resultB = document.getElementById('result');

let ctx = canvas.getContext('2d');
let ctx1 = canvas.getContext('2d');
let creature = Creature.getRandomCreature();
let creature1 = Creature.getRandomCreature();
//let physique = new Physique();
let algo = new Algo();

function update() {

    algo.update();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    algo.physique.creatures.forEach(creature => {
        drawCreature(creature);
    });
    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.moveTo(0,300);
    ctx.lineTo(300,300);
    ctx.stroke();
}

function drawCreature(creature){

    creature.muscles.forEach(muscle => {
        
                drawVector(muscle.objet1, muscle.objet2);
        
    });
    creature.objets.forEach(objet => {

        ctx.beginPath();
        ctx.fillStyle = 'rgb('+ objet.coef*255 +','+ objet.coef*255 +','+ 255+')'
        ctx.arc(objet.x, objet.y, objet.raduis, 0, 2 * Math.PI)
        
        ctx.fill();

    });

    
}
function drawVector(objet1,objet2){

    ctx.beginPath();
    ctx.moveTo(objet1.x, objet1.y);
    ctx.lineTo(objet2.x, objet2.y);
    ctx.lineWidth = 10/(0.1*Vecteur.getVecteurBetweenTwoObjets(objet1,objet2).getNorme()^2+20)+10;
    ctx.globalAlpha = 0.4
    ctx.strokeSytle = 'black'
    ctx.stroke();
    ctx.globalAlpha = 1
    ctx.fill;

}

function loop() {
    
    draw();
    update();
    requestAnimationFrame(loop);
    
}

stopRestartB.addEventListener('click', ()=> {
    if(algo.pause === true){
        algo.pause = false;
        stopRestartB.innerHTML = "Stop"
    } else {
        algo.stop()
        stopRestartB.innerHTML = "Restart"
    }
    
});

startB.addEventListener('click', () => {
    algo.init(document.getElementById('nbr').value);
});

resultB.addEventListener('click', () => {
    console.log(algo.result());
});

loop();