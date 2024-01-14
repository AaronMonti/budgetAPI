import mongoose from 'mongoose'

const { Schema } = mongoose

const expenseSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  expenseOwner: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  participants: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }]
})

export default mongoose.model('Expense', expenseSchema)
