import { Router } from "express"

import { getServiceByProfileId, createService, updateService, deleteService } from '../controllers/services.controller'

const router = Router()

router
    .get('/:id', getServiceByProfileId)
    .post('/', createService)
    .put('/services/:id', updateService)
    .delete('/services/:id', deleteService)

export default router
