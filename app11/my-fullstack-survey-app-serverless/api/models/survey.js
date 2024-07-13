/**
 * Model: Survey
 */

const AWS = require('aws-sdk')
const shortid = require('shortid')
const utils = require('../utils')


const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION
})

/**
 * Submit Survey
 * @param {string} survey.name User name
 * @param {string} survey.email User email
 * @param {string} survey.phoneno User phoneno
 */
const register = async(survey = {}) => {

  // Validate
  if (!survey.email) {
    throw new Error(`"email" is required`)
  }
  if (!survey.phoneno) {
    throw new Error(`"phoneno" is required`)
  }
  if (!utils.validateEmailAddress(survey.email)) {
    throw new Error(`"${survey.email}" is not a valid email address`)
  }

  // Check if user is already registered
  const existingEmail = await getByEmail(survey.email)
  if (existingEmail) {
    throw new Error(`A user with email "${survey.email}" is already registered`)
  }

  const existingPhoneno = await getByPhoneno(survey.phoneno)
  if (existingPhoneno) {
    throw new Error(`A user with Phone No. "${survey.phoneno}" is already registered`)
  }


  // Save
  const params = {
    TableName: process.env.db,
    Item: {
      Name: survey.name,
      Email: survey.email,
      Phoneno: survey.phoneno,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      }
  }

  await dynamodb.put(params).promise()
}

/**
 * Get user by email address
 * @param {string} email
 */

const getByEmail = async(email) => {

  // Validate
  if (!email) {
    throw new Error(`"email" is required`)
  }
  if (!utils.validateEmailAddress(email)) {
    throw new Error(`"${email}" is not a valid email address`)
  }

  // Save
  const params = {
    TableName: process.env.db,
    KeyConditionExpression: 'Email = :Email',
    ExpressionAttributeValues: { ':Email': email }
  }

  let survey = await dynamodb.query(params).promise()

  survey = survey.Items && survey.Items[0] ? survey.Items[0] : null
  if (survey) {
    survey.Phoneno = survey.Phoneno
    survey.Email = survey.Email
    survey.Name = survey.Name
  }
  return survey
}

/**
 * Get user by id
 * @param {string} id
 */

const getByPhoneno = async(phoneno) => {

  // Validate
  if (!phoneno) {
    throw new Error(`"phoneno" is required`)
  }

  // Save
  const params = {
    TableName: process.env.db,
    IndexName: process.env.dbIndex1,
    KeyConditionExpression: 'Phoneno = :Phoneno',
    ExpressionAttributeValues: { ':Phoneno': phoneno }
  }
  let survey = await dynamodb.query(params).promise()

  survey = survey.Items && survey.Items[0] ? survey.Items[0] : null
  if (survey) {
    survey.Phoneno = survey.Phoneno
    survey.Email = survey.Email
    survey.Name = survey.Name
  }
  return survey
}

/**
 * Convert user record to public format
 * This hides the keys used for the dynamodb's single table design and returns human-readable properties.
 * @param {*} survey 
 */
const convertToPublicFormat = (survey = {}) => {
  survey.Email = survey.Email || null
  survey.Name = survey.Name || null
  if (survey.Name) delete survey.Name
  if (survey.Email) delete survey.Email
  if (survey.Phoneno) delete survey.Phoneno
  //if (user.password) delete user.password
  return survey
}

module.exports = {
  register,
  getByEmail,
  // getById,
  getByPhoneno,
  convertToPublicFormat
}