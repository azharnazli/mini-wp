const mongoose = require('mongoose')
const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title cannot be empty']
  },
  content: {
    type: String,
    required: [true, 'content cannot be empty']
  },
  createdAt: Date,
  user: {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  imgPath : String
})

ArticleSchema.pre('findOneAndUpdate', function(next){
  if(this.getUpdate().title == '' || this.getUpdate().content == '') {
    next( new Error('title or content cant be empty'))
  }
  next()
})

let article = mongoose.model('Article', ArticleSchema)

module.exports = article