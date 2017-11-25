import { question } from '../db-api'
import { User } from '../models/index'

export const questionsMiddleware = async (req, res, next) => {
  try {
    req.questions = await question.findAll()
    next()
  } catch (error) {
    res.status(500).json({
      message: 'An error ocurred',
      error
    })
  }
}

export const questionMiddleware = async (req, res, next) => {
  try {
      const { id } = req.params
      res.question = await question.findById(id)
      next()
  } catch (error) {
      res.status(500).json({
        message: 'An error ocurred finding question',
        error
      })
  }
}

export const questionAdd = async (req, res) => {
    const { title, description, icon } = req.body
    const q = {
      title,
      description,
      icon,
      user: req.user._id
    }

    try {
      const savedQuestions = await question.create(q)
      res.status(201).json(savedQuestions)
    } catch (error) {
      res.status(500).json({
        message: 'An error ocurred created question',
        error
      })
    }
}


export const questionAddAnswer = async (req, res) => {
  const answer = req.body
  const q = res.question
  answer.createdAt = new Date()
  answer.user = new User(req.user)
  try {
    const savedAnswer = await question.createAnswer(q, answer)
    res.status(201).json(savedAnswer)
  } catch (error) {
    res.status(500).json({
      message: 'An error ocurred created answer',
      error
    })
  }
}
