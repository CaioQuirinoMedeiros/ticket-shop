import mongoose, { ToObjectOptions } from 'mongoose'

import { Password } from '../services/password'

interface UserAttrs {
  email: string
  password: string
}

interface UserDoc extends mongoose.Document, UserAttrs {}

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

userSchema.set('toJSON', {
  versionKey: false,
  transform(doc: mongoose.Document, ret: any) {
    ret.id = ret._id
    delete ret._id
    delete ret.password
  }
} as ToObjectOptions)

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
})

const UserModel = mongoose.model<UserDoc>('User', userSchema)

class User extends UserModel {
  constructor(attrs: UserAttrs) {
    super(attrs)
  }
}

export { User }
