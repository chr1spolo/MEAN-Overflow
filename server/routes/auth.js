import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'

const app = express.Router()
const debug = new Debug('platzi-overflow:auth')

const secretKey = 'miclavesecreta'

const users = [
  {
    firstName: 'Chris',
    lastName: 'Polo',
    email: 'polidavis@gmail.com',
    password: '123456',
    _id: 123
  }
]

const findUserByEmail = e =>  users.find( ({email}) => email === e )

const compairPassword = (providerPassword, userPassword) => {
    return providerPassword === userPassword
}

app.post('/signin', (req, res, next) => {
    const {email, password} = req.body
    const user = findUserByEmail(email)

    if (!user) {
        debug(`User with ${email} not found`)
        return handleLoginFailed(res)
    }

    if ( !compairPassword(password, user.password) ) {
        debug(`Password do not match ${password} !== ${user.password}`)
        return handleLoginFailed(res)
    }

    const _token = jwt.sign({ user }, secretKey, {
      expiresIn: 86400
    })

    res.status(200).json({
      message: 'Login succeded',
      _token,
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
})


function handleLoginFailed(res) {
    res.status(401).json({
      message: 'Login failed',
      error: 'Email and password do not match'
    })
}


export default app
