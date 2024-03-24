import express from 'express'
const app = express()
const port = 3000

import usersRoutes from './routes/users'

app.use(express.json())

app.use('/users', usersRoutes)

app.get('/', (req, res) => {
  res.send('API Wash')
})

app.listen(port, () => {
  console.log(`Servidor executando na porta: ${port}`)
})
