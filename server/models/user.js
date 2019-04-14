const { hash } = require('../helper/bcrypt')

const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'first name cannot be empty']
  },
  last_name: {
    type: String,
    required: [true, 'last name cannot be empty']
  },
  password: {
    type: String,
    required: [true, 'password cannot be empty']
  },
  email: {
    type: String,
    required: [true, 'email cannot be empty'],
    validate: [{
      validator: function (value) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(value).toLocaleLowerCase())
      },
      message: `email format error`
    }, {
      validator: function (value) {
        return user.findOne({
            email: value,
            _id: {
              $ne: this._id
            }
          })
          .then((found) => {
            if (found) return false
          })
      },
      message: `email alreaddy registered`
    }]
  }
})

UserSchema.pre('save', function (next) {
  this.password = hash(this.password)
  next()
})

let user = mongoose.model('User', UserSchema)

module.exports = user