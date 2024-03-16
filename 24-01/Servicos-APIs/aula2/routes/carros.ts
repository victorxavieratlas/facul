import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const router = Router()
const prisma = new PrismaClient()

router.get("/", async (req, res) => {
    const carros = await prisma.carro.findMany()
    res.status(200).json(carros)
})

router.post("/", async (req, res) => {

    const { modelo, marca, ano, preco, cor } = req.body

    if (!modelo || !marca || !ano || !preco || !cor) {
        res.status(400).json({"erro": "Informe modelo, marca, ano, preco e cor"})
        return
    }

    const carro = await prisma.carro.create({
        data: {
            modelo,
            marca,
            ano,
            preco,
            cor
        }
    })
    res.status(201).json(carro)
})
//Crias as rotas e os métodos para excluir e alterar os carros
export default router
