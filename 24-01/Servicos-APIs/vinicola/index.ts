import express from 'express'
const app = express()
const port = 3000

import marcasRoutes from './routes/marcas'
import vinhosRoutes from './routes/vinhos'

app.use(express.json())
app.use("/marcas", marcasRoutes)
app.use("/vinhos", vinhosRoutes)

app.get('/', (req, res) => {
  res.send('API de Vinhos: Cadastro de Marcas e Vinhos')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})