import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true
      }
    })
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        profile: true
      }
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { email, password, name, profile } = req.body

  if (!email || !password) {
    res.status(400).json({ "erro": "Email and Password are required!" })
    return
  }

  try {
    const user = await prisma.user.create({
      data: { email, password, name }
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) },
      include: {
        profile: true
      }
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/delete/:id", async (req, res) => {
  const { id } = req.params
  const deletedAt = new Date()

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { deletedAt },
      include: {
        profile: true
      }
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { email, password, name } = req.body

  if (!email || !password) {
    res.status(400).json({ "erro": "Email and Password are required!" })
    return
  }

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { email, password, name },
      include: {
        profile: true
      }
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/role-update/:id", async (req, res) => {
  const { id } = req.params
  const { role } = req.body

  if (!role) {
    res.status(400).json({ "erro": "role are required!" })
    return
  }

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { role }
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
