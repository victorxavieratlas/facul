import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"

import * as dotenv from "dotenv"
dotenv.config()

const userClient = new PrismaClient().user

export const userLogin = async (req, res) => {
    const { email, password } = req.body

    const incorrectLoginMessage = {
        id: 0,
        msg: "Erro: Email ou senha são incorretos."
    }

    if (!email || !password) {
        res.status(400).json(incorrectLoginMessage)
        return
    }

    try {
        const user = await userClient.findUnique({ where: { email } })

        if (user == null) {
            res.status(400).json(incorrectLoginMessage)
            return
        }

        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({
                userId: user.id,
                userName: user.name
              },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
              )

            res.status(200).json({data: token})
        }
        else {
            res.status(400).json(incorrectLoginMessage)
            return
        }
    } catch (error) {
        res.status(400).json(error)
    }
}