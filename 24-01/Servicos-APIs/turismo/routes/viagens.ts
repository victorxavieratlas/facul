import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
    const viagens = await prisma.viagem.findMany()
    res.status(200).json(viagens)
})

router.post("/", async (req, res) => {
    const { destino, transporte, duracao, preco } = req.body

    if (!destino || !transporte || !duracao || !preco) {
        res.status(400).json({ "erro": "Informe todos os campos." })
        return
    }

    const viagens = await prisma.viagem.create({
        data: { destino, transporte, duracao, preco }
    })
    res.status(201).json(viagens)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params

    const viagem = await prisma.viagem.delete({
        where: { id: Number(id) }
    })
    res.status(200).json(viagem)
})

router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { preco } = req.body

    const viagem = await prisma.viagem.update({
        where: { id: Number(id) },
        data: { preco }
    })
    res.status(200).json(viagem)
})

export default router
