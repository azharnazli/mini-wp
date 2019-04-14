const routes = require('express').Router()
const UserController = require('../../controllers/UserController')

routes.post('/register', UserController.createUser)
routes.post('/normalLogin', UserController.loginNormal)
routes.post('/googleLogin', UserController.loginGoogle)


module.exports = routes