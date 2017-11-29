import http from 'http'
import Debug from 'debug'
import app from './app'
import mongoose from 'mongoose'
import { mongoUrl, port } from './config'

const debug = new Debug('Mean-overflow:root')

mongoose.Promise = global.Promise

async function start() {
  await mongoose.connect(mongoUrl, { useMongoClient: true })

  app.listen(port, () => {
    console.log(`Server running at port ${port}`)
  })

}

start()
