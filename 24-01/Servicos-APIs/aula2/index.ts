import express from 'express'
const app = express()
const port = 3000

import carrosRoutes from './routes/carros'

app.use(express.json())

app.use('/carros', carrosRoutes)

app.get('/', (req, res) => {
  res.send('API de Carros: Tabela FIPE de carros')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
