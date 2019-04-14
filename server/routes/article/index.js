const routes = require('express').Router()
const ArticleController = require('../../controllers/ArticleController')
const authenticated = require('../../middleware/authenticated')
const gcsMiddlewares = require('../../middleware/google-cloud-storage')
const {authorization} = require('../../middleware/authorize')
const multer = require('../../helper/multer')



routes.get('/findAll', ArticleController.findAllArticle)
routes.use(authenticated)

routes.post('/create', multer.single('image'), gcsMiddlewares.sendUploadToGCS, ArticleController.createArticle );
routes.get('/myArticle', ArticleController.myArticle )
routes.put('/edit/:articleId',multer.single('image'),gcsMiddlewares.sendUploadToGCS,authorization, ArticleController.editArticle)
routes.delete('/delete/:articleId', authorization, ArticleController.deleteArticle)
  


module.exports = routes