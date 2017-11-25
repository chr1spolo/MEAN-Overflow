import { question } from '../db-api'

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
      req.question = await question.findById(id)
      next()
  } catch (error) {
      res.status(500).json({
        message: 'An error ocurred',
        error
      })
  }
}
