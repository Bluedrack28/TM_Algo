let server = require('http').createServer();
let io = require('socket.io')(server);
let fs = require('fs')
console.log('Dependencies Loaded')

function formattedDate(d = new Date()) {
    let year = String(d.getFullYear())
    let month = String(d.getMonth() + 1)
    let day = String(d.getDate())
    let hour = String(d.getHours())
    let minute = String(d.getMinutes())

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    if (hour.length < 2) hour = '0' + hour
    if (minute.length < 2) minute = '0' + minute

    return `${year}${month}${day}${hour}${minute}`;
  }

io.on('connection',function(client){
    
    client.on('event',function(date){});
    client.on('disconnect',function(){});
    client.on('data',(data)=>{
        let json = JSON.stringify(data)
        console.log(data)
        let file = `data/data-${formattedDate()}.json`
        fs.writeFile(file, json, 'utf8', (err) => {
            console.log('Complete ! Wrote:', file)
        });
        
    })
});

server.listen(8081)
