import express from 'express'

const router = express.Router()

router.get('/api/users/signup', (request, response) => {
  return response.send('Hi there signup!!')
})

export {router as signupRouter}