import express from 'express'

const router = express.Router()

router.get('/api/users/signout', (request, response) => {
  return response.send('Hi there signout!!')
})

export {router as signoutRouter}