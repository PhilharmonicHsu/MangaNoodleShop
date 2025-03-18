import { Router } from 'express'
import bannerController from '../controllers/banner.controller'

const bannerRouter = Router()

bannerRouter.get('/', bannerController.getBanners)

export default bannerRouter