import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        images: true,
        schedules: true,
        cities: true,
        ratings: true,
        categories: true,
        plans: true,
      }
    })
    res.status(200).json(profiles)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const profile = await prisma.profile.findUnique({
      where: { id: Number(id) },
      include: {
        images: true,
        schedules: true,
        cities: true,
        ratings: true,
        categories: true,
        plans: true,
      }
    })
    res.status(200).json(profile)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/list/total-points", async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        images: true,
        schedules: true,
        cities: true,
        ratings: true,
        categories: true,
        plans: true,
      },
      orderBy: {
        totalPointsPlans: 'desc'
      }
    })
    res.status(200).json(profiles)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/list/max-price", async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        images: true,
        schedules: true,
        cities: true,
        ratings: true,
        categories: true,
        plans: true,
      },
      orderBy: {
        maxPrice: 'desc'
      }
    })
    res.status(200).json(profiles)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/list/min-price", async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        images: true,
        schedules: true,
        cities: true,
        ratings: true,
        categories: true,
        plans: true,
      },
      orderBy: {
        maxPrice: 'asc'
      }
    })
    res.status(200).json(profiles)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/list/ratings", async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        images: true,
        schedules: true,
        cities: true,
        ratings: true,
        categories: true,
        plans: true,
      }
    })
    res.status(200).json(profiles)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const {
    bio,
    phone,
    startDay,
    finalDay,
    minPrice,
    maxPrice,
    userId,
    images,
    schedules,
    cities,
    categories,
    plans,
    totalPointsPlans
  } = req.body

  try {
    const profile = await prisma.profile.create({
      data: {
        bio,
        phone,
        startDay,
        finalDay,
        minPrice,
        maxPrice,
        userId,
        totalPointsPlans
      }
    })
    res.status(201).json(profile)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const profile = await prisma.profile.delete({
      where: { id: Number(id) },
      include: {
        images: true,
        schedules: true,
        cities: true,
        ratings: true,
        categories: true,
        plans: true,
      }
    })
    res.status(200).json(profile)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/delete/:id", async (req, res) => {
  const { id } = req.params
  const deletedAt = new Date()

  try {
    const profile = await prisma.profile.update({
      where: { id: Number(id) },
      include: {
        images: true,
        schedules: true,
        cities: true,
        ratings: true,
        categories: true,
        plans: true,
      },
      data: { deletedAt }
    })
    res.status(200).json(profile)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const {
    bio,
    phone,
    startDay,
    finalDay,
    minPrice,
    maxPrice,
    userId,
    images,
    schedules,
    cities,
    categories
  } = req.body

  try {
    const profile = await prisma.profile.update({
      where: { id: Number(id) },
      data: {
        bio,
        phone,
        startDay,
        finalDay,
        minPrice,
        maxPrice,
        userId,
        images,
        schedules,
        cities,
        categories
      }
    })
    res.status(200).json(profile)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
