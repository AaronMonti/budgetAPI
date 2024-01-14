import User from '../models/User.js'

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()

    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'No se pudieron obtener los usuarios' })
  }
}

export {
  getAllUsers
}
