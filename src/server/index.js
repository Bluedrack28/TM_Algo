let http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    server = http.createServer(),
    io = require('socket.io')(server),
    port = process.argv[2] || 8888;

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

http.createServer(function(request, response) {

    let uri = url.parse(request.url).pathname, 
        filename = path.join(path.join(process.cwd(),'../'), uri);
    let contentTypesByExtension = {
        '.html': "text/html",
        '.css':  "text/css",
        '.js':   "text/javascript"
    };

    fs.exists(filename, function(exists) {
        if(!exists) {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
        return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
        if(err) {        
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end();
            return;
        }

        var headers = {};
        var contentType = contentTypesByExtension[path.extname(filename)];
        if (contentType) headers["Content-Type"] = contentType;
        response.writeHead(200, headers);
        response.write(file, "binary");
        response.end();
        });
    });
}).listen(parseInt(port, 10));

io.on('connection',function(client){
    
    client.on('event',function(date){});
    client.on('disconnect',function(){});
    client.on('data',(data)=>{
        let json = JSON.stringify(data)
        console.log(data)
        
        let folder = `data/${data.generation}g-${data.clock}c-${data.size}s`
        let file = `${folder}/data-${formattedDate()}.json`
        fs.mkdir(folder,function(e){
            if(!e || (e && e.code === 'EEXIST')){
                fs.writeFileSync(file, json, 'utf8', (err) => {
                    console.log(err)
                });
                console.log('Wrote !!', file)
                io.emit("success")
            } else {
                //debug
                console.log(e);
            }
        });
        
        
        
    })
});

server.listen(8081)

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");