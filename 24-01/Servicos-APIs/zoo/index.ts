import express from 'express'
const app = express()
const port = 3000

import animaisRoutes from './routes/animais'

app.use(express.json())
app.use("/animais", animaisRoutes)

app.get('/', (req, res) => {
  res.send('API de Filmes: Venda de Filmes Online')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})