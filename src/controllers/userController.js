import User from '../models/User.js'

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()

    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'No se pudieron obtener los usuarios' })
  }
}

const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo obtener el usuario' })
  }
}

const updateOneUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo actualizar el usuario' })
  }
}

const deleteOneUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id })

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar el usuario' })
  }
}

export {
  getAllUsers,
  getOneUser,
  updateOneUser,
  deleteOneUser
}
