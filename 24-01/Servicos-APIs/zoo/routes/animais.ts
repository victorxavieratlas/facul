import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  const animais = await prisma.animal.findMany()
  res.status(200).json(animais)
})

router.post("/", async (req, res) => {
  const { nome, raca, idade, custo_mensal } = req.body

  if (!nome || !raca || !idade || !custo_mensal) {
    res.status(400).json({ "erro": "Informe todos os dados" })
    return
  }

  const animal = await prisma.animal.create({
    data: { nome, raca, idade, custo_mensal }
  })
  res.status(201).json(animal)
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  const animal = await prisma.animal.delete({
    where: { id: Number(id) }
  })
  res.status(200).json(animal)
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nome, raca, idade, custo_mensal } = req.body

  if (!nome || !raca || !idade || !custo_mensal) {
    res.status(400).json({ "erro": "Informe todos os dados" })
    return
  }

  const animal = await prisma.animal.update({
    where: { id: Number(id) },
    data: { nome, raca, idade, custo_mensal }
  })
  res.status(200).json(animal)
})

router.get("/pesquisa/:raca", async (req, res) => {
  const { raca } = req.params

  const animais = await prisma.animal.findMany({
    where: {
      raca: {
        contains: raca
      }
    }
  })
  res.status(200).json(animais)
})

router.get("/custo/:valor", async (req, res) => {
  const { valor } = req.params

  const animais = await prisma.animal.findMany({
    where: {
      custo_mensal: {
        gte: Number(valor)
      }
    }
  })
  res.status(200).json(animais)
})

router.get("/ordem/idade", async (req, res) => {
  const animais = await prisma.animal.findMany({
    select: {
      nome: true,
      raca: true,
      idade: true
    },
    orderBy: {
      idade: 'asc'
    }
  })
  res.status(200).json(animais)
})

router.get("/dados/gerais", async (req, res) => {
  const animais = await prisma.animal.aggregate({
    _sum: {
      custo_mensal: true
    },
    _avg: {
      idade: true
    }
  })
  res.status(200).json({
    custo_total: animais._sum.custo_mensal,
    idade_media: animais._avg.idade,
  })
})

router.get("/grupos/raca", async (req, res) => {
  const animais = await prisma.animal.groupBy({
    by: 'raca',
    _count: {
      id: true
    }
  })
  res.status(200).json(animais)
})

export default router