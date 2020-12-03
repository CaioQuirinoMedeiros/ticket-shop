import mongoose from 'mongoose'

import { Password } from '../services/password'

interface UserAttrs {
  email: string
  password: string
}

interface UserDoc extends mongoose.Document, UserAttrs {
  metodoNovo(): void
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
})

userSchema.static('metodoNovo', (params: any) => {
  console.log('params', params)
  console.log('opaaa')
})

const UserModel = mongoose.model<UserDoc>('User', userSchema)

class User extends UserModel {
  constructor(attrs: UserAttrs) {
    super(attrs)
  }
}

export { User }
