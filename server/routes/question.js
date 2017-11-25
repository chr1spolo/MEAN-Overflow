import express from 'express'
import { setTimeout } from 'core-js/library/web/timers';
import { userInfo } from 'os';
import {
    required,
    questionMiddleware,
    questionsMiddleware,
    questionAdd,
    questionAddAnswer
} from '../middleware'

const app = express.Router()

app.get('/', questionsMiddleware, (req, res) => {
  setTimeout( () => {
      res.status(200).json(req.questions)
  }, 2000)
})
app.get('/:id', questionMiddleware, (req, res) => {
  res.status(201).json(res.question)
})

app.post('/', required, questionsMiddleware, questionAdd)

app.post('/:id/answers', required, questionMiddleware, questionAddAnswer)

export default app
