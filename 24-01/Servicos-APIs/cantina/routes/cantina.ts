import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  const alunos = await prisma.aluno.findMany()
  res.status(200).json(alunos)
})

router.post("/", async (req, res) => {
  const { nome, turma, obs, nomeResp, numWhatsResp } = req.body

  if (!nome || !turma || !obs || !nomeResp || !numWhatsResp) {
    res.status(400).json({ "erro": "Informe todos os dados" })
    return
  }

  const aluno = await prisma.aluno.create({
    data: { nome, turma, obs, nomeResp, numWhatsResp }
  })
  res.status(201).json(aluno)
})

router.post("/deposito/:alunoIdParams", async (req, res) => {
  const { alunoIdParams } = req.params
  const { data, tipo, valor } = req.body

  if (!data || !tipo || !valor || !alunoIdParams) {
    res.status(400).json({ "erro": "Informe todos os dados" })
    return
  }

  const alunoId = Number(alunoIdParams)

  try {
    const [deposito, aluno] = await prisma.$transaction([
      prisma.deposito.create({ data: { data, alunoId, tipo, valor } }),
      prisma.aluno.update({ where: { id: alunoId }, data: { numDepositos: { increment: 1 }, totalDepositos: {increment: valor} } })
    ])
    res.status(201).json({ deposito, aluno })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/deposito/:idParams", async (req, res) => {
    const { idParams } = req.params
    const { depositoId, valor } = req.body

    if (!idParams || !depositoId || !valor) {
      res.status(400).json({ "erro": "Informe todos os dados" })
      return
    }

    const id = Number(idParams)

    try {
        const [deposito, aluno] = await prisma.$transaction([
          prisma.deposito.delete({ where: { id: depositoId } }),
          prisma.aluno.update({ where: { id }, data: { numDepositos: { decrement: 1 }, totalDepositos: {decrement: valor} } })
        ])
        res.status(200).json({ deposito, aluno })
      } catch (error) {
        res.status(400).json(error)
      }
  })
  
router.get("/deposito", async (req, res) => {
  const deposito = await prisma.deposito.findMany()
  res.status(200).json(deposito)
})

router.post("/gastos/:alunoIdParams", async (req, res) => {
  const { alunoIdParams } = req.params
  const { data, lanche, valor } = req.body

  if (!data || !lanche || !valor || !alunoIdParams) {
    res.status(400).json({ "erro": "Informe todos os dados" })
    return
  }

  const alunoId = Number(alunoIdParams)

  try {
    const [gasto, aluno] = await prisma.$transaction([
      prisma.gasto.create({ data: { data, alunoId, lanche, valor } }),
      prisma.aluno.update({ where: { id: alunoId }, data: { numCompras: { increment: 1 }, totalCompras: {increment: valor} } })
    ])
    res.status(201).json({ gasto, aluno })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/gastos/:idParams", async (req, res) => {
  const { idParams } = req.params
  const { gastoId, valor } = req.body

  if (!idParams || !gastoId || !valor) {
    res.status(400).json({ "erro": "Informe todos os dados" })
    return
  }

  const id = Number(idParams)

  try {
      const [gasto, aluno] = await prisma.$transaction([
        prisma.gasto.delete({ where: { id: gastoId } }),
        prisma.aluno.update({ where: { id }, data: { numCompras: { decrement: 1 }, totalCompras: {decrement: valor} } })
      ])
      res.status(200).json({ gasto, aluno })
    } catch (error) {
      res.status(400).json(error)
    }
})

router.get("/gastos", async (req, res) => {
  const gastos = await prisma.gasto.findMany()
  res.status(200).json(gastos)
})

router.get("/alunos/saldo", async (req, res) => {
  const alunos = await prisma.aluno.findMany({
    include: {
      gastos: true,
      depositos: true
    }
  })

  const alunosSaldo = alunos.map(aluno => {
    const saldo = aluno.totalDepositos - aluno.totalCompras;
    return {
      ...aluno,
      saldo
    };
  });

  res.status(200).json(alunosSaldo);
})

export default router
