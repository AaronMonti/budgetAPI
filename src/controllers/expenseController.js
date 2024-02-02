import Expense from '../models/Expense.js'
import User from '../models/User.js'

const getAllExpenses = async (req, res) => {
  const userId = req.user.userId

  try {
    const expenses = await Expense.find({
      $or: [
        { expenseOwner: userId }, // Usuario es dueño
        { participants: { $in: [userId] } } // Usuario es participante
      ]
    }).populate('expenseOwner').populate('participants')
    res.json(expenses)
  } catch (error) {
    res.status(500).json({ message: 'No se pudieron obtener los gastos' })
  }
}

const getOneExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id })

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
    const { description, date, amount, category, participants } = req.body

    const userId = req.user.userId
    console.log(userId)
    const creatorUser = await User.findById(userId)

    // TODO: Arreglar calculo de participantes, toma string y no array

    const newExpense = new Expense({
      description,
      date,
      amount,
      category,
      expenseOwner: creatorUser._id,
      participants,
      amountByParticipant: amount / 2
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
    const expense = await Expense.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })

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

const expensesBetweenParticipants = (expenses) => {
  expenses.forEach(expense => {
    if (expense.participants && expense.participants.length >= 0) {
      const participants = expense.participants.length + 1
      const montoPorParticipante = expense.amount / participants
      console.log(montoPorParticipante)

      expense.participants.forEach(participante => {
        participante.montoCalculado = montoPorParticipante
      })
    }

    return expenses
  })
}

const getMonthlyExpenses = async (req, res) => {
  try {
    const userId = req.user.userId
    const expenses = await Expense.find({
      $or: [
        { expenseOwner: userId }, // Usuario es dueño
        { participants: { $in: [userId] } } // Usuario es participante
      ]
    }).populate('expenseOwner').populate('participants')

    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]

    const monthlyData = expenses.reduce((accumulator, expense) => {
      const month = new Date(expense.date).getMonth()

      // Agrega la etiqueta del mes utilizando el array predefinido de nombres de meses
      accumulator.months[month] = monthNames[month]

      // Agrega la cantidad del gasto al array correspondiente al mes
      accumulator.data[month] = (accumulator.data[month] || 0) + expense.amount

      return accumulator
    }, { months: [], data: [] })

    // Devuelve un objeto JSON que contiene las etiquetas de los meses y los datos mensuales
    res.json({ labels: monthNames, data: monthlyData.data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
export {
  getAllExpenses,
  getOneExpense,
  createNewExpense,
  updateOneExpense,
  deleteOneExpense,
  getMonthlyExpenses
}
