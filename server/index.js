import http from 'http'
import Debug from 'debug'
import app from './app'
import mongoose from 'mongoose'
import { mongoUrl } from './config'

const PORT = 3000
const debug = new Debug('Mean-overflow:root')

mongoose.Promise = global.Promise

async function start() {
  await mongoose.connect(mongoUrl, { useMongoClient: true })

  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
  })

}

start()
