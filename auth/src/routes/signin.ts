import express from 'express'

const router = express.Router()

router.get('/api/users/signin', (request, response) => {
  return response.send('Hi there, signin!!')
})

export { router as signinRouter }
