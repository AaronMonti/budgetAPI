import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  expenses: [{
    type: Schema.Types.ObjectId, ref: 'Expense'
  }]
})

export default mongoose.model('User', userSchema)
