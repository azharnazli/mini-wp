const User = require('../models/user')
const { sign } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.SECRET_KEY)
const { compare } = require('../helper/bcrypt')

class UserController {

  static createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static loginNormal(req, res) {
    User.findOne({
        email: req.body.email
      })
      .then((found) => {
        if (!found) {
          res.status(500).json({
            error: `username or password is wrong`
          })
        } else {
          if (!compare(req.body.password, found.password)) {
            res.status(500).json({ error: `username or password is wrong`})
          } else {
              let token = sign({
                _id: found._id,
                email: found.email
              })
              res.status(200).json({token, email: req.body.email})
          }
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static loginGoogle(req, res) {
    let payload = {}
    client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload()
        return User.findOne({
          email: payload.email
        })
      })
      .then(found => {
        if (!found) {
          return User.create({
            email: payload.email,
            password: 12345,
            first_name: payload.given_name,
            last_name: payload.family_name
          })
        } else {
          let token = sign({
            _id: found._id,
            email: payload.email
          })
          res.status(200).json({token, email : payload.email})
        }
      })
      .then((data) => {
        if (data) {
          let token = sign({
            _id: data._id,
            email: data.email
          })
          res.status(201).json({token, email : data.email})
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}


module.exports = UserController