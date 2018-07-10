new p5();
const socket = io.connect('http://127.0.0.1:8081');

let date = new Date()
let algo = new Algorithm(10,1000,0.25,0.5)


/*let cre = new Creature()

cre.nodes = [
	new Node(100,150,2,0),
	new Node(150,200,2,0),
	new Node(200,150,2,0.3),
]
let l1 = new Link(cre.nodes[0],cre.nodes[1],1,100),
	l2 = new Link(cre.nodes[0],cre.nodes[1],1,100),
	l3 = new Link(cre.nodes[2],cre.nodes[0],1,100)


cre.links = [
	l1,
	l2,
	l3,
]

cre.muscles = [
	new Muscle(cre.nodes[0],cre.nodes[1],50,25,10),
	new Muscle(cre.nodes[2],cre.nodes[1],50,60,10)

]
cre = Creature.createRandomCreature()
*/
algo.generatePool()
function setup () {
	createCanvas(1000, 480)
}

function draw () {
	background(255)
	algo.update()
	algo.display()
}
function keyTyped(){
	if(key === 's'){
	// 	textAlign(CENTER)
	// 	fill(255,0,0)
	// 	noStroke()
	// 	textSize(30)
	// 	text('DATAS EMITED', width/2, height/2)
		socket.emit('data',algo.getData());
		console.log('Datas emited')
		
	}
}