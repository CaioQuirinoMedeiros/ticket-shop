import request from 'supertest'

import app from '../../app'
import { User } from '../../models/user'

it('clears the cookie after signing out', async () => {
  const password = 'password'

  const user = await User.create({ email: 'test@test.com', password: password })

  await request(app)
    .post('/api/users/signin')
    .send({
      email: user.email,
      password: password
    })
    .expect(200)

  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200)

  expect(response.get('Set-Cookie')[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
})
