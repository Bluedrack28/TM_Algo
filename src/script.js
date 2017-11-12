//const Physique = require('./physique.js');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d')
let objet1 = new RoundObjet(100, 100, 100, 10);
let objet2 = new RoundObjet(200, 100, 100, 10);
let muscle = new Muscle(objet1, objet2, new Motion(2,2));
function update() {
    muscle.setForcesToObjets();
    objet1.updatePosition();
    objet2.updatePosition();
    console.log(objet1.getIntSpeed(), objet2.getIntSpeed() )
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    
    ctx.fillStyle = 'grey'
    ctx.arc(objet1.x, objet1.y, objet1.raduis, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'blue'
    ctx.arc(objet2.x, objet2.y, objet2.raduis, 0, 2 * Math.PI);
    ctx.fill();
}

function loop() {
    
    draw();
    update();
    requestAnimationFrame(loop);
    //objet1.addForce(new Force(-2,2));
    
}
loop();