import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

type CitiesInput = {
    name: string;
    zone: string;
};

router.get("/", async (req, res) => {
  try {
    const cities = await prisma.city.findMany()
    res.status(200).json(cities)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const city = await prisma.city.findUnique({
      where: { id: Number(id) }
    })
    res.status(200).json(city)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/list/:name", async (req, res) => {
  const { name } = req.params

  try {
      const cities = await prisma.city.findMany({
          where: {
              name
          }
      })
      res.status(200).json(cities)
  } catch (error) {
      res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const {
    name,
    zone
  } = req.body

  try {
    const city = await prisma.city.create({
      data: {
        name,
        zone
      }
    })
    res.status(201).json(city)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/create", async (req, res) => {
    const cities: CitiesInput[] = req.body.citiesInput;

    try {
        const creates = cities.map(({ name, zone }) => 
            prisma.city.create({
                data: {
                    name,
                    zone
                }
            })
        );

        const citiesRecords = await Promise.all(creates);
        res.status(201).json(citiesRecords);
    } catch (error) {
        res.status(400).json(error);
    }
});

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
    name,
    zone
  } = req.body

  try {
    const cities = await prisma.city.update({
      where: { id: Number(id) },
      data: {
        name,
        zone
      }
    })
    res.status(200).json(cities)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
