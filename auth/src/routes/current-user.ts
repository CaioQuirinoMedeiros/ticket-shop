import express from 'express'

const router = express.Router()

router.get('/api/users/currentuser', (request, response) => {
  return response.send('Hi there current-user!!')
})

export {router as currentUserRouter}