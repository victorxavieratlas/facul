// import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import * as dotenv from "dotenv"
dotenv.config()

import { Cliente } from "../models/Cliente.js"

export async function loginCliente(req, res) {
  const { email, senha } = req.body

  const mensaErroPadrao = "Erro... Login ou senha incorreto"

  if (!email || !senha) {
    res.status(400).json({ erro: mensaErroPadrao })
    return
  }

  // verifica se o email está cadastrado
  try {
    const cliente = await Cliente.findOne({ where: { email } })

    if (cliente == null) {
      res.status(400).json({ erro: mensaErroPadrao })
      return
    }

    // se encontrado, compara a criptografia da senha armazenada
    // com a criptografia da senha informada
    if (bcrypt.compareSync(senha, cliente.senha)) {
      // se confere, gera e retorna o token
      // const token = jwt.sign({
      //   usuario_logado_id: usuario.id,
      //   usuario_logado_nome: usuario.nome
      // },
      //   process.env.JWT_KEY,
      //   { expiresIn: "1h" }
      // )

      res.status(200).json({ msg: "Ok. Logado", cliente }) //token no lugar do cliente para jwt token
    }
    else {
      res.status(400).json({ erro: mensaErroPadrao })
      return
    }
  } catch (error) {
    res.status(400).json(error)
  }
}