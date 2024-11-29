import { PrismaClient } from "@prisma/client"
import { Router } from "express"


const prisma = new PrismaClient()
const router = Router()


async function main() {
  /***********************************/
  /* SOFT DELETE MIDDLEWARE */
  /***********************************/

  prisma.$use(async (params, next) => {
    // Check incoming query type
    if (params.model == 'Animal') {
      if (params.action == 'delete') {
        // Delete queries
        // Change action to an update
        params.action = 'update'
        params.args['data'] = { deleted: true }
      }
    }
    return next(params)
  })
}
main()

router.get("/", async (req, res) => {
  try {
    const animais = await prisma.animal.findMany({
      where: { deleted: false }
    })
    res.status(200).json(animais)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { nome, raca, idade, custo_mensal, usuarioId } = req.body

  if (!nome || !raca || !idade || !custo_mensal) {
    res.status(400).json({ erro: "Informe nome, raca, idade e custo_mensal" })
    return
  }

  try {
    const animal = await prisma.animal.create({
      data: { nome, raca, idade, custo_mensal, usuarioId }
    })
    res.status(201).json(animal)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const animal = await prisma.animal.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(animal)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nome, raca, idade, custo_mensal } = req.body

  if (!nome || !raca || !idade || !custo_mensal) {
    res.status(400).json({ erro: "Informe nome, raca, idade e custo_mensal" })
    return
  }

  try {
    const animal = await prisma.animal.update({
      where: { id: Number(id) },
      data: { nome, raca, idade, custo_mensal }
    })
    res.status(200).json(animal)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router