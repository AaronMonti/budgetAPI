import jwt from 'jsonwebtoken'

const authorized = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        error: new Error('Token not found!')
      })
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    const user = decodedToken

    req.user = user

    next()
  } catch (error) {
    res.status(401).json({
      error: new Error('Invalid request!')
    })
  }
}

export default authorized
