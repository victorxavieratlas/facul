import express from 'express'
import { sequelize } from './database/conecta.js'
import cors from "cors"

import { Filme } from './models/Filme.js'
import routes from './routes.js'

const app = express()
const port = 3004

app.use(express.json())
app.use(cors())
app.use(routes)

app.get('/', (req, res) => {
  res.send('Sistema de filmes')
})

async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com Banco de Dados realizada com Sucesso');
    await Filme.sync()
    console.log("Tabela de Filmes: OK")
  } catch (error) {
    console.error('Erro ao conectar o banco de dados:', error);
  }  
}
conecta_db()

app.listen(port, () => {
  console.log(`API de Carros Rodando na Porta: ${port}`)
})