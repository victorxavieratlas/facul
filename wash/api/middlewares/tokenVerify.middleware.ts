import jwt from "jsonwebtoken"

import { PrismaClient } from "@prisma/client"

const userClient = new PrismaClient().user

import * as dotenv from "dotenv"
dotenv.config()

export async function tokenVerify(req, res, next) {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ erro: "Acesso restrito!" })
    }
    console.log(token)
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_KEY)
        console.log("TRY")
        console.log(tokenDecode)
        req.userId = tokenDecode.userId
        req.userName = tokenDecode.userName
        console.log(req.userId)
        console.log(req.userName)

        const user = await userClient.findUnique({
            where: { id: Number(tokenDecode.userId) }
        })

        if (!user) {
            return res.status(400).json({ erro: "Usuário não existe!" })
        }

        next()
    } catch (error) {
        return res.status(401).json({ erro: "Token de autenticação inválido!" })
    }
}