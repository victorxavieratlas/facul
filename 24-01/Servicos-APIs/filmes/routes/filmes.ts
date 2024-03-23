import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
    const filmes = await prisma.filme.findMany()
    res.status(200).json(filmes)
})

router.post("/", async (req, res) => {

    const { titulo, genero, duracao, preco } = req.body

    if(!titulo || !genero || !duracao || !preco) {
        res.status(400).json({"msg": "Informe todos os campos."})
        return
    }

    const filmes = await prisma.filme.create({
        data: {
            titulo,
            genero,
            duracao,
            preco
        }
    })
    res.status(201).json(filmes)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params

    const filme = await prisma.filme.delete({
        where: { id: Number(id) }
    })
    res.status(200).json(filme)
})

router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { preco } = req.body

    const filme = await prisma.filme.update({
        where: { id: Number(id) },
        data: { preco }
    })
    res.status(200).json(filme)
})

export default router
