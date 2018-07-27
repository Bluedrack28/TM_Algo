new p5();
const socket = io.connect('http://127.0.0.1:8081');

let date = new Date()
let algo = new Algorithm(10,1000,0.25,0.5)
let end = false

algo.generatePool()
function setup () {
	createCanvas(1000, 480)
}

function draw () {
	background(255)
	while(!end){
		algo.update()
		//algo.display()
		
		if(algo.generation == 50){
			socket.emit('data',algo.getData())
			end = true
			break
		}
	}
	if(end){
		algo.update()
		algo.display()
	}
	
}
function keyTyped(){
	if(key === 's'){
		socket.emit('data',algo.getData());
		console.log('Datas emited')
		
	}
}