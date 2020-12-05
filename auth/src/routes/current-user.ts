import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/api/users/currentuser', async (request, response) => {
  if (!request.session?.jwt) {
    return response.send({ currentUser: null })
  }

  try {
    const payload = jwt.verify(request.session?.jwt, process.env.JWT_KEY!)
    return response.send({ currentUser: payload })
  } catch {
    return response.send({ currentUser: null })
  }
})

export { router as currentUserRouter }
