let fs = require("fs");
let name = process.argv[2]
let action = process.argv[3]
let params = process.argv[4]
let actionOpen = process.argv[5]
let newLocation = process.argv[6]
let jsonFormat = [];

if (name !== '-h') {
    fs.readFile(name, 'utf8', function (err, data) {
        if (err) {
           return console.error(err);
        }
        if (action === '-t') {  //convert
            if (params === 'json') {
                let arr = data.split("\n")
                arr.forEach(el => {
                    jsonFormat.push(JSON.parse(el))
                })
                console.log(`Data is converted into ${params}`)
            } 
            else if (params === 'text') {
                console.log(`Data is converted into ${params}`)
            }
        } else { //open
            if (params) {
                createFile(data, params)
            } else {
                console.log("Please enter the new location")
            }
        }
        if (actionOpen === '-o') {
            if (newLocation) {
                if (jsonFormat.length === 0) {
                    createFile(data, newLocation);
                } else {
                    createFile(JSON.stringify(jsonFormat), newLocation);
                }
            } else {
                console.log("Please enter the new location")
            }
        }
     });
} else {
    console.log(`
        * Converting log files to JSON / Text :
            [filePath] -t ['json' / 'text'] \n
        * Saving the converted log file to specific folder
            [filePath] -t ['json' / 'text'] -o [newLocation]
    `)
}

 function createFile(data, location) {
    fs.writeFile(location, data, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log(`The new file is successfully store in ${location}`)
        }
    })
 }