import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany()
    res.status(200).json(profiles)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
