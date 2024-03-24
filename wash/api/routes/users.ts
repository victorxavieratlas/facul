import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
})

router.post("/", async (req, res) => {

    const {
        username,
        name,
        email,
        password,
        address,
        cep
    } = req.body

    if (!username || !name || !email || !password || !address || !cep) {
        res.status(400).json({ "msg": "Informe todos os campos." })
        return
    }

    const users = await prisma.user.create({
        data: {
            username,
            name,
            email,
            password,
            address,
            cep
        }
    })
    res.status(201).json(users)
})

router.get("/:id", async (req, res) => {
    const { id } = req.params

    const user = await prisma.user.findFirst({
        where: { id: Number(id) }
    })

    if (!user) {
        res.status(404).json({ "msg": "Usuário não encontrado." })
        return
    }
    res.status(200).json(user)
})

router.put("/:id", async (req, res) => {
    const { id } = req.params

    const {
        username,
        name,
        email,
        password,
        address,
        cep
    } = req.body

    const user = await prisma.user.update({
        where: { id: Number(id) },
        data: {
            username,
            name,
            email,
            password,
            address,
            cep
        }
    })
    res.status(200).json(user)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params

    const user = await prisma.user.delete({
        where: { id: Number(id) }
    })
    res.status(200).json(user)
})

export default router
