import express from 'express'
import { setTimeout } from 'core-js/library/web/timers';
import { userInfo } from 'os';

const app = express.Router()

const currentUser = {
    firstName: 'Chris',
    lastName: 'Polo',
    email: 'polidavis',
    password: '123456'
}

function questionMiddleware(req, res, next) {
    const { id } = req.params
    req.question = questions.find( ({_id}) => _id === +id)
    next()
}

function userMiddleware(req, res, next) {
    req.user = currentUser
    next()
}

const question = {
  _id: 1,
  title: '¿Como reutilizo un componente en Android?',
  description: 'Miren esta es mi pregunta...',
  createdAt: new Date(),
  icon: 'devicon-android-plain colored',
  answers: [],
  user: {
    firstName: 'Chris',
    lastName: 'Polo',
    email: 'polidavis',
    password: '123456'
  }
}

const questions = new Array(1).fill(question)

app.get('/', (req, res) => {
  setTimeout( () => {
      res.status(200).json(questions)
  }, 2000)
})
app.get('/:id', questionMiddleware, (req, res) => {
  setTimeout( () => {
      res.status(200).json(req.question)
  }, 2000)
})

app.post('/', userMiddleware, (req, res) => {
    const question = req.body
    question._id = +new Date()
    question.user = req.user
    question.createdAt = new Date()
    question.answers = []
    questions.push(question)
    res.status(201).json(question)
})

app.post('/:id/answers', questionMiddleware, userMiddleware, (req, res) => {
    const answer = req.body
    const q = req.question
    answer.createdAt = new Date()
    answer.user = req.user
    q.answers.push(answer)
    res.status(201).json(answer)
})

export default app
