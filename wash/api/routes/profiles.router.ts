import { Router } from "express"

import { createProfile, createProfileComplete, deleteProfile, getAllProfiles, getListOfMaxPrice, getListOfMinPrice, getListOfTotalPoints, getProfileById, softDeleteProfile, updateProfile } from "../controllers/profiles.controller"
import { tokenVerify } from '../middlewares/tokenVerify.middleware'

const profileRouter = Router()

profileRouter
	// .get("/", tokenVerify, getAllProfiles) - Com middleware
	.get("/", getAllProfiles)
	.get("/:id", getProfileById)
	.get("/list/total-points", getListOfTotalPoints)
	.get("/list/max-price", getListOfMaxPrice)
	.get("/list/min-price", getListOfMinPrice)
	// .post("/", tokenVerify, createProfile) - Com middleware
	.post("/", createProfile)
	.post("/complete", createProfileComplete)
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

