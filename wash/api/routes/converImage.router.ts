import { Router } from 'express'
import { upload, uploadCoverImage } from '../controllers/coverImage.controller'

const coverImageRouter = Router()

coverImageRouter.post('/', upload.single('image'), uploadCoverImage)

export default coverImageRouter
