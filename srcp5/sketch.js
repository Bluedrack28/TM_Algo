new p5();

let cre = Creature.createRandomCreature()

function setup () {
	createCanvas(640, 480)  
}

function draw () {
	background(255)
	cre.update()
	cre.display()
}
