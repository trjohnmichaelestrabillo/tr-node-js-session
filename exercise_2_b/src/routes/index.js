const userRoutes = require('./user-routes.js')

const registerRoutes = (app) => {
    app.use('/exercise-2/', userRoutes)
}

module.exports = registerRoutes