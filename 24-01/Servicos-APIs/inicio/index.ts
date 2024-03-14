import express from 'express'

import alunosRoutes from './routes/alunos'

const app = express()
const port = 3000

app.use(express.json)
app.use('/alunos', alunosRoutes)

app.get('/', (req, res) => {
  res.send('Aula 1: APIs')
})

app.listen(port, () => {
  console.log(`Servidor executando na porta: ${port}`)
})