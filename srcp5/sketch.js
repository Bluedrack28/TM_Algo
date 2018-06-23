new p5();

let cre = Creature.createRandomCreature()
let p1 = new Node(100,100,2)
let p2 = new Node(200,200,2)
let p3 = new Node(50,100,2)

let link = new Link(p1,p2,1,50)
let link1 = new Link(p1,p3,1,50)
let link2 = new Link(p2,p3,1,50)
let muscle = new Muscle(p1,p3,20,40,10)
function setup () {
	createCanvas(640, 480)  
}

function draw () {
	background(255)
	cre.update()
	cre.display()
}
