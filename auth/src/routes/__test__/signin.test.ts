import request from 'supertest'

import app from '../../app'
import { User } from '../../models/user'

it('fails when a email that not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '123456'
    })
    .expect(400)
})

it('fails when incorrect email is supplied', async () => {
  const password = '123456'

  const user = await User.create({
    email: 'test@test.com',
    password: password
  })

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'any_incorrect_email@test.com',
      password: password
    })
    .expect(400)
})

it('fails when incorrect password is supplied', async () => {
  const user = await User.create({
    email: 'test@test.com',
    password: '123456'
  })

  await request(app)
    .post('/api/users/signin')
    .send({
      email: user.email,
      password: 'any_incorrect_password'
    })
    .expect(400)
})

it('returns a 200 on successfull signin', async () => {
  const password = '123456'

  const user = await User.create({
    email: 'test@test.com',
    password: password
  })

  await request(app)
    .post('/api/users/signin')
    .send({
      email: user.email,
      password: password
    })
    .expect(200)
})

it('returns a 400 with missing an invalid e-mail', async () => {
  const password = '123456'

  await User.create({
    email: 'test@test.com',
    password: password
  })

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'testtest.com',
      password: password
    })
    .expect(400)
})


it('sets a cookie after successfull signin', async () => {
  const password = '123456'

  const user = await User.create({
    email: 'test@test.com',
    password: password
  })

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: user.email,
      password: password
    })
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})
