const Article = require('../models/article')

module.exports = {
  authorization: function (req, res, next) {
    Article.findOne({
        _id: req.params.articleId
      })
      .populate('user')
      .then(data => {
        if (data.user.email === req.authenticated.email) {
          next()
        } else {
          res.status(401).json({
            errors: {
              message: 'You dont have access for modify this article'
            }
          })
        }
      })
  }
}