new p5();

let cre = new Creature()
cre.nodes = [
	new Node(100,150,2,0.3),
	new Node(150,200,2,1),
	new Node(200,50,2,1),
]
let l1 = new Link(cre.nodes[0],cre.nodes[1],1,75),
	l2 = new Link(cre.nodes[0],cre.nodes[1],1,75),
	l3 = new Link(cre.nodes[2],cre.nodes[0],1,75)


cre.links = [
	l1,
	l2,
	l3,
]

cre.muscles = [
	new Muscle(cre.nodes[0],cre.nodes[1],50,25,10),
	new Muscle(cre.nodes[2],cre.nodes[1],50,60,10)

]
console.log(cre)
function setup () {
	createCanvas(640, 480)  
}

function draw () {
	background(255)
	cre.update()
	cre.display()
}
