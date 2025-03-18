import {Request, Response} from 'express'
import bannerModel from '../models/banner.model'

const getBanners = (request: Request, response: Response) => {
    const receipts = bannerModel.findAll()

    response.status(200).json(receipts)
}

export default {
    getBanners,
}