const pageRoutes = require('./routes')

module.exports = function(app, globalPath) {
    pageRoutes(app, globalPath)
}