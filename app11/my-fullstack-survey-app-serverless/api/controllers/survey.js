/**
 * Controllers: Users
 */

//const jwt = require('jsonwebtoken')
const { survey } = require('../models')
//const { comparePassword } = require('../utils')
//const survey = require('../models')

/**
 * Save
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 */
const register = async (req, res, next) => {

  try {
    await survey.register(req.body)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }

  // let user
  // try {
  //   user = await users.getByEmail(req.body.email)
  // } catch (error) {
  //   console.log(error)
  //   return next(error, null)
  // }

  // const token = jwt.sign(user, process.env.tokenSecret, {
  //   expiresIn: 604800 // 1 week
  // })

  res.json({ message: 'Saved Successfully'})
}

/**
 * Sign a user in
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
// const login = async (req, res, next) => {

//   let user
//   try { user = await users.getByEmail(req.body.email) }
//   catch (error) { return done(error, null) }

//   if (!user) {
//     return res.status(404).send({ error: 'Authentication failed. User not found.' })
//   }

//   const isCorrect = comparePassword(req.body.password, user.password)
//   if (!isCorrect) {
//     return res.status(401).send({ error: 'Authentication failed. Wrong password.' })
//   }

//   const token = jwt.sign(user, process.env.tokenSecret, {
//     expiresIn: 604800 // 1 week
//   })

//   res.json({ message: 'Authentication successful', token })
// }

/**
 * Get a user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const get = async (req, res, next) => {
  const survey = survey.convertToPublicFormat(req.survey)
  res.json({ survey })
}

module.exports = {
  register,
  //login,
  get,
}