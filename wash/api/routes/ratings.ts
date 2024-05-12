import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const ratings = await prisma.rating.findMany()
    res.status(200).json(ratings)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const rating = await prisma.rating.findUnique({
      where: { id: Number(id) }
    })
    res.status(200).json(rating)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/list/total-ratings", async (req, res) => {
  try {
    const ratings = await prisma.rating.findMany({
      select: {
        id: true,
        comment: true,
        value: true,
        total: true,
      },
      orderBy: {
        total: 'desc'
      }
    })
    res.status(200).json(ratings)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const {
    comment,
    value,
    total,
    profileId
  } = req.body

  try {
    const rating = await prisma.rating.create({
      data: {
        comment,
        value,
        total,
        profileId
      }
    })
    res.status(201).json(rating)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const rating = await prisma.rating.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(rating)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/delete/:id", async (req, res) => {
  const { id } = req.params
  const deletedAt = new Date()

  try {
    const rating = await prisma.rating.update({
      where: { id: Number(id) },
      data: { deletedAt }
    })
    res.status(200).json(rating)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const {
    comment,
    value,
    total
  } = req.body

  try {
    const rating = await prisma.rating.update({
      where: { id: Number(id) },
      data: {
        comment,
        value,
        total
      }
    })
    res.status(200).json(rating)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
