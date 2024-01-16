import bcryt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = await bcryt.hash(password, 10)
    const user = new User({
      username,
      email,
      password: hashedPassword
    })
    await user.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo registrar el usuario' })
  }
}

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json({ message: 'Credenciales invalidas' })
    }
    const isMatch = await bcryt.compare(req.body.password, user.password)
    if (!isMatch) {
      return res.status(404).json({ message: 'Credenciales invalidas' })
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h'
      }
    )

    res.status(200).json({ token, email: user.email, userId: user._id, name: user.username })
  } catch (error) {
    res.status(500).json({ message: 'No se pudo iniciar sesion' })
  }
}

export {
  register,
  login
}
