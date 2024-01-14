import Expense from '../models/Expense.js'
import User from '../models/User.js'

const getAllExpenses = async (req, res) => {
  /* Quiero obetener los gastos donde mi usuario este como owner o participante  */
  try {
    const expenses = await Expense.find().populate('expenseOwner').populate('participants')

    res.json(expenses)
  } catch (error) {
    res.status(500).json({ message: 'No se pudieron obtener los gastos' })
  }
}

const getOneExpense = async (req, res) => {
  try {
    const userId = req.user.userId
    const expense = await Expense.findOne({ _id: req.params.id, expenseOwner: userId })

    if (!expense) {
      return res.status(404).json({ message: 'Gasto no encontrado' })
    }

    res.json(expense)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo obtener el gasto' })
  }
}

const createNewExpense = async (req, res) => {
  try {
    const { description, date, amount, category, paymentMethod, status, participants } = req.body

    const userId = req.user.userId
    const creatorUser = await User.findById(userId)

    const partUsers = await User.find({ _id: { $in: participants } })

    const newExpense = new Expense({
      description,
      date,
      amount,
      category,
      paymentMethod,
      status,
      expenseOwner: creatorUser._id,
      participants: partUsers.map(user => user._id)
    })

    const savedExpense = await newExpense.save()

    creatorUser.expenses = creatorUser.expenses.concat(savedExpense._id)
    await creatorUser.save()

    res.json(savedExpense)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo crear el gasto' })
  }
}

const updateOneExpense = async (req, res) => {
  try {
    const userId = req.user.userId
    const expense = await Expense.findOneAndUpdate({ _id: req.params.id, expenseOwner: userId }, req.body, { new: true })

    if (!expense) {
      // Si la Expense no se encuentra o no pertenece al usuario actual
      return res.status(404).json({ message: 'Gasto no encontrado o no autorizado' })
    }

    res.json(expense)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo actualizar el gasto' })
  }
}

const deleteOneExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id })

    if (!expense) {
      // Si la Expense no se encuentra o no pertenece al usuario actual
      return res.status(404).json({ message: 'Gasto no encontrado o no autorizado' })
    }

    res.json(expense)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar el gasto' })
  }
}

export {
  getAllExpenses,
  getOneExpense,
  createNewExpense,
  updateOneExpense,
  deleteOneExpense
}
