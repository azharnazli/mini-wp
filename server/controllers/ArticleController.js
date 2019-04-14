const Article = require('../models/article')
const Filter = require('bad-words')
let filter = new Filter()

class ArticleController {

  static createArticle(req, res) {
    req.body.title = filter.clean(req.body.title)
    req.body.content = filter.clean(req.body.content)
    Article.create({
        title: req.body.title,
        content: req.body.content,
        createdAt: new Date,
        user: req.authenticated._id,
        imgPath : req.file ? req.file.gcsUrl : `http://placehold.it/750x300`
      })
      .then((article) => {
        res.status(201).json(article)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  static findAllArticle(req, res) {
    Article.find()
      .populate('user')
      .then((articles) => {
        res.status(200).json(articles)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  } 

  static myArticle(req, res) {
    Article.find({
      user:req.authenticated._id
      })
      .then((articles) => {
        res.status(200).json(articles)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  
  static editArticle(req, res) {
    req.body.title = filter.clean(req.body.title)
    req.body.content = filter.clean(req.body.content)
    let data = {}
    if(!req.file) {
      data = {
      title : req.body.title,
      content : req.body.content,
      } 
    } else {
      data = {
        title : req.body.title,
        content : req.body.content,
        imgPath : req.file.gcsUrl
      }
    }
    Article.findByIdAndUpdate({
      _id : req.params.articleId
    }, data)
      .then((article)=> {
        res.status(200).json(article)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteArticle(req, res) {
    Article.deleteOne({_id : req.params.articleId})
      .then((article) => {
        res.status(200).json(article)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = ArticleController