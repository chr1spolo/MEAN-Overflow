import express from 'express'
import { setTimeout } from 'core-js/library/web/timers';

const app = express.Router()

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

const questions = new Array(10).fill(question)

app.get('/', (req, res) => {
  setTimeout( () => {
      res.status(200).json(questions)
  }, 2000)
})
app.get('/:i', (req, res) => {
  setTimeout( () => {
      res.status(200).json(question)
  }, 2000)
})

export default app
