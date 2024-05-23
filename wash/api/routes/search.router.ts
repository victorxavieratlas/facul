import { Router } from "express"

import { getAllCities, getAllStates, getCityByContainName, getCityById, getCityByName, getProfilesByCityById, getStateByContainName, getStateById, getStateByName } from "../controllers/search.controller"

const router = Router()

router
    .get("/city", getAllCities)
    .get("/city/:id", getCityById)
    .get("/profiles/city/:id", getProfilesByCityById)
    .get("/city/list/:name", getCityByName)
    .get("/city/list/contain/:name", getCityByContainName)
    .get("/state", getAllStates)
    .get("/state/:id", getStateById)
    .get("/state/list/:name", getStateByName)
    .get("/state/list/contain/:name", getStateByContainName)

export default router
