const fs = require('fs')
const file = require('./file')

module.exports = function(app, globalPath) {
    app.get('/', (req, res) => res.render(globalPath('index')))
    app.get('/tasks', (req, res) => res.render(globalPath('tasks')))
    app.get('/market', (req, res) => res.render(globalPath('market')))
    app.get('/inventory', (req, res) => res.render(globalPath('inventory')))
    app.get('/about', (req, res) => res.render(globalPath('about'))) 
    app.get('/policy', (req, res) => res.render(globalPath('policy'))) 
    app.get('/completed', (req, res) => res.render(globalPath('completed')))
    app.get('/uncompleted', (req, res) => res.render(globalPath('uncompleted'))) 
    // app.get('/getItems', (req, res) => {
    //     let items = fs.readFileSync('items.json', 'utf8')
    //     res.send(items)
    // })
    app.post('/savePhoto', (req, res) => file(req.files.file))
}
