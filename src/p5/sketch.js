new p5();
const socket = io.connect('http://localhost:8081');

let date = new Date()
let algo = new Algorithm(10,5000)
let end = false

algo.generatePool()
function setup () {
	let canvas = createCanvas(1000, 480)
	canvas.parent('container');
	//console.log(canvas)
}

function draw () {
	background(255)	
	algo.update()
	algo.display()
}
function runAlgo(nbrGeneration){
	let nbrRun = 1
	for (let i = 0; i < nbrRun; i++) {
		algo.generatePool()
		end = false
		while(!end){
			algo.update()
			if(algo.generation == nbrGeneration){
				
				socket.emit('data',algo.getData())
				socket.on('success',()=>{
					console.log(algo.getData())
					console.log('Data emitted')
				})
				
				end = true
			}
		}
	}
	end = true
	
}
document.getElementById('reboot').addEventListener('click',()=>{
	let nbrCreature = document.getElementById('nbrCreature').value
	let duration = document.getElementById('duration').value
	if(duration != "" && nbrCreature != ""){
		algo = new Algorithm(nbrCreature,duration)
	}
	algo.generatePool()
})
document.getElementById('send').addEventListener('click',()=>{
	socket.emit('data',algo.getData())
	console.log('Datas emited')
})
socket.on('success',()=>{
	console.log('success')
	document.getElementById('alert').style.display = "block"
})
document.getElementById('run').addEventListener('click',()=>{
	let nbrGeneration = document.getElementById('nbrGeneration').value
	if (nbrGeneration != ""){
		runAlgo(nbrGeneration)
	} else {
		runAlgo(50)
	}

	
})
function keyTyped(){
	if(key === 's'){
		socket.emit('data',algo.getData());
		console.log('Datas emited')
		
	}
}