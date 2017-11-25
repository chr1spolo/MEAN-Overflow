import Debug from 'debug'
import { secretKey } from '../config'
import jwt from 'jsonwebtoken'
import { User } from '../models/index'
import {
  hashSync as hash,
  compareSync as compairPassword
} from 'bcryptjs'

const debug = new Debug('platzi-overflow:auth')

/* export const findUserByEmail = e =>  users.find( ({email}) => email === e ) */

export const required = (req, res, next) => {
    jwt.verify(req.query._token, secretKey, (err, _token) => {
        if (err) {
          Debug('JWTF was not encrypted with our secretKey');
          return res.status(401).json({
            message: 'Unauthorized',
            error: err
          })
        }

        debug(`Token verified ${_token}`)
        req.user = _token.user
        next()
    })
}

export const userLogin = async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})

  if (!user) {
      console.log(`User with ${email} not found`)
      return handleLoginFailed(res, 'El correo y/o la contraseña no coinciden')
  }

  if ( !compairPassword(password, user.password) ) {
      console.log(`Password do not match ${password} !== ${user.password}`)
      return handleLoginFailed(res)
  }

  const _token = createToken(user)

  res.status(200).json({
    message: 'Login succeded',
    _token,
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  })
}

export const createNewUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  const u = new User({
    firstName,
    lastName,
    email,
    password: hash(password, 10)
  })
  const user = await u.save()
  console.log(`Creating new user ${user}`)
  const _token = createToken(user)
  res.status(201).json({
    message: 'User saved',
    _token,
    userId: user._id,
    firstName,
    lastName,
    email
  })
}


const createToken = (user) => jwt.sign({user}, secretKey, {expiresIn:86400})


function handleLoginFailed(res, message) {
  res.status(401).json({
    message: 'Login failed',
    error: message || 'Email and password do not match'
  })
}

