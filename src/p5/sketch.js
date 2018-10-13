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
document.getElementById('reboot').addEventListener('click',()=>{
	algo = new Algorithm(
		document.getElementById('nbrCreature').value,
		document.getElementById('duration').value
	)
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
	runAlgo(1,document.getElementById('nbrGeneration').value)
})
function keyTyped(){
	if(key === 's'){
		socket.emit('data',algo.getData());
		console.log('Datas emited')
		
	}
}