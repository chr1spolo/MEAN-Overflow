import Debug from 'debug'
import { Question } from '../models/index'

const debug = new Debug('Mean-overflow:db-api:questions')

export default {
    findAll: async () => {
        debug('Finding all questions')
        return await Question.find().populate('answers')
    },

    findById: async (id) => {
        debug(`Finding question with id ${id}`)
        return await Question.findOne({ _id })
                              .populate('user')
                              .populate({
                                path: 'answers',
                                options: { sort: '-createdAt' },
                                populate: {
                                  path: 'user',
                                  model: 'User'
                                }
                              })
    }
}
