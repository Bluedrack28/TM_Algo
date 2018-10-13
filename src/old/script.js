let canvas = document.getElementById('canvas')
let stopRestartB = document.getElementById('stop')
let startB = document.getElementById('start')
let resultB = document.getElementById('result')
let alterateB = document.getElementById('alterate')
let draws = false
let ctx = canvas.getContext('2d')
let algo = new Algo()
let affichage = new Draw(canvas)

function update() {

    algo.update()
}

function loop() {
    
    affichage.draw(algo, draws)
    update()
    requestAnimationFrame(loop)
    
}

stopRestartB.addEventListener('click', ()=> {
    if(algo.pause === true){
        algo.pause = false
        stopRestartB.innerHTML = "Stop"
    } else {
        algo.stop()
        stopRestartB.innerHTML = "Resume"
    }
    
})

startB.addEventListener('click', () => {
    algo.init(document.getElementById('nbr').value)
})

resultB.addEventListener('click', () => {
    draws = true
    console.log(algo.result())
})
alterateB.addEventListener('click',()=>{
    console.log(algo.newGeneration())
})

loop()