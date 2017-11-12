//const Physique = require('./physique.js');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d')
let objet = new RoundObjet(100, 100, 0.3, 10, new Speed(4,0), [new Force(4,2),new Force(-4,-2)]);

function update() {

    objet.updatePosition();

}

function draw() {
    ctx.beginPath();
    
    ctx.fillStyle = 'grey'
    console.log(objet)
    ctx.arc(objet.x, objet.y, objet.raduis, 0, 2 * Math.PI);
    ctx.fill();
}

function loop() {
    for (let i = 0; i < 100; i++) {
        draw();
        update();
    }
    
}
loop();