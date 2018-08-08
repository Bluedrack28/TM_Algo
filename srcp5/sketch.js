new p5();
const socket = io.connect('http://localhost:8081');

let date = new Date()
let algo = new Algorithm(10,5000)
let end = false

algo.generatePool()
function setup () {
	createCanvas(1000, 480)
}

function draw () {
	background(255)
	
	if(!end){
		runAlgo(1,100)
	}
	
	algo.update()
	algo.display()
	
	
}
function runAlgo(nbrRun,nbrGeneration){
	
	for (let i = 0; i < nbrRun; i++) {
		algo.generatePool()
		console.log('Run number: '+ i)
		end = false
		while(!end){
			algo.update()
			if(algo.generation == nbrGeneration){
				socket.emit('data',algo.getData())
				console.log(algo.getData())
				console.log('Data emitted')
				end = true
			}
		}
	}
	end = true
	
}
function keyTyped(){
	if(key === 's'){
		socket.emit('data',algo.getData());
		console.log('Datas emited')
		
	}
}