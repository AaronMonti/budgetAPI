import bcryt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      userEmail: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '23h' // Short-lived access token
    }
  )
}

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      userEmail: user.email
    },
    process.env.JWT_REFRESH,
    {
      expiresIn: '7d' // Long-lived refresh token
    }
  )
}

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

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    res.status(200).json({ accessToken, refreshToken, email: user.email, userId: user._id, name: user.username })
  } catch (error) {
    res.status(500).json({ message: 'No se pudo iniciar sesion' })
  }
}

const refreshAccessToken = async (req, res) => {
  const refreshToken = req.body.refreshToken

  if (!refreshToken) {
    return res.status(401).json({ message: 'Token de actualización no proporcionado' })
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH)
    // Obtener el usuario asociado al token de actualización
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' })
    }

    // Generar un nuevo token de acceso
    const newAccessToken = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24
      }
    )

    console.log(newAccessToken)

    res.status(200).json({ accessToken: newAccessToken, expiresIn: 60 * 60 * 24 })
  } catch (error) {
    res.status(403).json({ message: 'Token de actualización inválido' })
  }
}

export {
  register,
  login,
  refreshAccessToken
}
