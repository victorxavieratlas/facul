import express from 'express'
const app = express()
const port = 3004

import imoveisRoutes from './routes/imoveis'

app.use(express.json())
app.use("/imoveis", imoveisRoutes)

app.get('/', (req, res) => {
  res.send('API de imobiliária')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})