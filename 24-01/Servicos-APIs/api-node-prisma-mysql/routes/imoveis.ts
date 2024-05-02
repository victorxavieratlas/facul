import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => { 
  const imoveis = await prisma.imovel.findMany()
  res.status(200).json(imoveis) 
})
 
router.post("/", async (req, res) => {
  const { nome, endereco, bairro, dorm, preco, habitat } = req.body

  if (!nome || !endereco || !bairro || !dorm || !preco || !habitat) {
    res.status(400).json({ "erro": "Informe todos os dados" })
    return
  }

  const imovel = await prisma.imovel.create({
    data: { nome, endereco, bairro, dorm, preco, habitat }
  })
  res.status(201).json(imovel)
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  const imovel = await prisma.imovel.delete({
    where: { id: Number(id) }
  })
  res.status(200).json(imovel)
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nome, endereco, bairro, dorm, preco, habitat } = req.body

  if (!nome || !endereco || !bairro || !dorm || !preco || !habitat) {
    res.status(400).json({ "erro": "Informe todos os dados" })
    return
  }

  const imovel = await prisma.imovel.update({
    where: { id: Number(id) },
    data: { nome, endereco, bairro, dorm, preco, habitat }
  })
  res.status(200).json(imovel)
})

router.get("/pesq/:nome", async (req, res) => {
  const { nome } = req.params

  const imoveis = await prisma.imovel.findMany({
    where: {
      nome: {
        contains: String(nome)
      }
    }
  })
  res.status(200).json(imoveis)
})

router.get("/pesquisa/filtro/:preco/:habitat", async (req, res) => {
  const { preco, habitat } = req.params

  const imoveis = await prisma.imovel.findMany({
    where: {
      preco: {
        lt: Number(preco)
      },
      habitat: {
        equals: habitat
      }
    }
  })
  res.status(200).json(imoveis)
})

router.get("/ordem/imovel", async (req, res) => {
  const imoveis = await prisma.imovel.findMany({
    select: {
      nome: true,
      habitat: true,
      endereco: true,
      preco: true
    },
    orderBy: {
      preco: 'asc'
    }
  })
  res.status(200).json(imoveis)
})

router.get("/dados/gerais", async (req, res) => {
  const imoveis = await prisma.imovel.aggregate({
    _sum: {
      preco: true
    },
    _avg: {
      preco: true
    }
  })
  res.status(200).json({
    preco_total: imoveis._sum.preco,
    preco_medio: imoveis._avg.preco,
  })
})

router.get("/grupos/habitat", async (req, res) => {
  const imoveis = await prisma.imovel.groupBy({
    by: 'habitat',
    _count: {
      id: true
    }
  })
  res.status(200).json(imoveis)
})

export default router