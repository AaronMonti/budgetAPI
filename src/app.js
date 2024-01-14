import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { swaggerDocs as V1SwaggerDocs } from './v1/swagger.js'

import connectDB from './db.js'
import v1ExpensesRouter from './v1/routes/expenseRoutes.js'
import v1UsersRouter from './v1/routes/userRoutes.js'
import v1AuthRouter from './v1/routes/authRoutes.js'
import authorized from './middlewares/auth.js'

const app = express()
const PORT = process.env.PORT || 9000

// Conexión a MongoDB
connectDB()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/v1/expense', authorized, v1ExpensesRouter)
app.use('/api/v1/', v1AuthRouter)
app.use('/api/v1/user', v1UsersRouter)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT} 🚀`)
  V1SwaggerDocs(app, PORT)
})
