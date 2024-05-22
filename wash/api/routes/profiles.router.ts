import { Router } from "express"

import { createProfile, deleteProfile, getAllProfiles, getListOfMaxPrice, getListOfMinPrice, getListOfTotalPoints, getProfileById, softDeleteProfile, updateProfile } from "../controllers/profiles.controller"

const profileRouter = Router()

profileRouter
	.get("/", getAllProfiles)
	.get("/:id", getProfileById)
	.get("/list/total-points", getListOfTotalPoints)
	.get("/list/max-price", getListOfMaxPrice)
	.get("/list/min-price", getListOfMinPrice)
	.post("/", createProfile)
	.delete("/:id", deleteProfile)
	.put("/delete/:id", softDeleteProfile)
	.put("/:id", updateProfile)

export default profileRouter


// router.get("/list/ratings", async (req, res) => {
//   try {
//     const profiles = await prisma.profile.findMany({
//       include: {
//         images: true,
//         schedules: true,
//         cities: true,
//         ratings: true,
//         categories: true,
//         plans: true,
//       }
//     })
//     res.status(200).json(profiles)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

