const routes = require('express').Router()
const users = require('./user')
const articles = require('./article')

routes.use('/users', users)
routes.use('/articles', articles)


module.exports = routes