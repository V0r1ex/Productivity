const fs = require('fs')

// создание файла
function createFile(file) {
    fs.writeFile(`resources/images/items/${file.name}`, file.data, function(err) { console.log(err) }) 
}

module.exports = createFile
