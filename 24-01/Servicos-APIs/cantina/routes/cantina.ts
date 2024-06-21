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


// router.get("/", async (req, res) => {
//   const gastos = await prisma.gasto.findMany()
//   res.status(200).json(gastos)
// })

// router.post("/", async (req, res) => {
//   const { data, lanche, alunoId } = req.body

//   if (!data || !lanche || alunoId) {
//     res.status(400).json({ "erro": "Informe todos os dados" })
//     return
//   }

//   const gasto = await prisma.gasto.create({
//     data: { data, lanche, alunoId }
//   })
//   res.status(201).json(gasto)
// })

// router.get("/", async (req, res) => {
//   const depositos = await prisma.deposito.findMany()
//   res.status(200).json(depositos)
// })

// router.post("/", async (req, res) => {
//   const { data, tipo, valor, alunoId } = req.body

//   if (!data || !tipo || !valor || !alunoId) {
//     res.status(400).json({ "erro": "Informe todos os dados" })
//     return
//   }

//   try {
//     const [gasto, aluno] = await prisma.$transaction([
//       prisma.deposito.create({ data: { data, alunoId, tipo, valor } }),
//       prisma.aluno.update({ where: { id: alunoId }, data: { numDepositos: { increment: 1 }, totalDepositos: {increment: valor} } })
//     ])
//     res.status(201).json({ gasto, aluno })
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// router.delete("/:id", async (req, res) => {
//     const { id } = req.params
//     const { valor } = req.body


//     try {
//         const [gasto, aluno] = await prisma.$transaction([
//           prisma.deposito.delete({ where: { id: Number(id) } }),
//           prisma.aluno.update({ where: { gastos: {id: Number(id)} }, data: { numDepositos: { decrement: 1 }, totalDepositos: {decrement: valor} } })
//         ])
//         res.status(200).json({ gasto, aluno })
//       } catch (error) {
//         res.status(400).json(error)
//       }
//   })

export default router
