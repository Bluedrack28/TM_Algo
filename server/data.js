//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'data');
//passsing directoryPath and callback function
let jsonFiles = []
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file);
        jsonFiles.push(file)
        
    
    });
    let datas = []
    jsonFiles.forEach(filename => {
        let data = JSON.parse(fs.readFileSync(path.join(directoryPath,filename), 'utf8'));
        datas.push(data)
    });
    console.log(datas)
    
});
