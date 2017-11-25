import mongoose, { Schema } from 'mongoose'
import { User, Answer } from './index'

const { ObjectId } = Schema.Types

const QuestionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  icon: { type: String, required: true },
  user: { type: ObjectId, ref: 'User', required: true },
  answers: [ { type: ObjectId, ref: 'Answer' } ]
})

export default mongoose.model('Question', QuestionSchema)
