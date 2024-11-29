import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()
const router = Router()

router.post("/", async (req, res) => {

    const { email, senha } = req.body

    const mensaPadrao = "Email ou senha incorretos!"

    if (!email || !senha) {
        res.status(400).json({ erro: "Informe email e senha!" })
        return
    }

    try {
        const usuario = await prisma.usuario.findFirst({
            where: { email }
        })

        if (usuario == null) {
            res.status(400).json({ erro: mensaPadrao })
            return
        }

        if (bcrypt.compareSync(senha, usuario.senha)) {
            res.status(200).json({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,

            })
        } else {
            res.status(400).json({ erro: mensaPadrao })
            return
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

export default router
