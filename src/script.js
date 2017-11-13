//const Physique = require('./physique.js');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d')
let objet1 = new RoundObjet(100, 100, 100, 10);
let objet2 = new RoundObjet(200, 100, 100, 10);
let objet3 = new RoundObjet(100, 200, 100, 10);
let objet4 = new RoundObjet(100, 200, 100, 10);
objet1.addForce(new Force(0,98.1));
objet2.addForce(new Force(0,98.1));
objet3.addForce(new Force(0,98.1));
//objet4.addForce(new Force(0,+9.81));
let muscle = new Muscle(objet1, objet2, [new Motion(Math.random()*10,Math.random()*10),new Motion(Math.random()*10,Math.random()*10)],Math.random()*100,Math.random()*100);
let muscle1 = new Muscle(objet1, objet3, [new Motion(Math.random()*10,Math.random()*10),new Motion(Math.random()*10,Math.random()*10)],Math.random()*100,Math.random()*100);
let muscle2 = new Muscle(objet2, objet3, [new Motion(Math.random()*10,Math.random()*10),new Motion(Math.random()*10,Math.random()*10)],Math.random()*100,Math.random()*100);
//let muscle3 = new Muscle(objet1, objet4, [new Motion(Math.random()*10,Math.random()*10),new Motion(Math.random()*10,Math.random()*10)],Math.random()*100,Math.random()*100);
function update() {
    muscle.setForcesToObjets();
    muscle1.setForcesToObjets();
    muscle2.setForcesToObjets();
    objet1.updatePosition();
    objet2.updatePosition();
    objet3.updatePosition();
    objet4.updatePosition();
    console.log(objet1.getIntSpeed(), objet2.getIntSpeed() )
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawVector(objet1,objet2);
    drawVector(objet2,objet3);
    drawVector(objet1,objet3);
    ctx.beginPath();
    
    ctx.fillStyle = 'grey'
    ctx.arc(objet1.x, objet1.y, objet1.raduis, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'blue'
    ctx.arc(objet2.x, objet2.y, objet2.raduis, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'green'
    ctx.arc(objet3.x, objet3.y, objet3.raduis, 0, 2 * Math.PI);
    ctx.fill();

}

function drawVector(objet1,objet2){
    ctx.beginPath();
    ctx.moveTo(objet1.x, objet1.y);
    ctx.lineTo(objet2.x, objet2.y);
    ctx.lineWidth = 10;
    ctx.strokeSytle = 'black'
    ctx.stroke();
}

function loop() {
    
    draw();
    update();
    requestAnimationFrame(loop);
    //objet1.addForce(new Force(-2,2));
    
}
loop();