import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { debounceTime } from 'rxjs/operators/debounceTime';
import { create } from 'domain';
import { secretKey } from '../config'
import { users, createNewUser, userLogin } from '../middleware'

const app = express.Router()
const debug = new Debug('platzi-overflow:auth')


app.post('/signin', userLogin)

app.post('/signup', createNewUser)


export default app
