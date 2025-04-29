import receiptController from '../controllers/receipt.controller'
import bannerController from '../controllers/banner.controller'
import { Receipt as IReceipt } from 'types/receipt'
import { Banner as IBanner } from 'types/banner'

export const resolvers = {
    Query: {
        receipts: async () => receiptController.getReceipts(),
        banners: async () => bannerController.getBanners()
    },
    Mutation: {
        addReceipt: async (_: unknown, {
            name,
            ingredients,
            calories,
            price,
            rates,
            image
        }: Omit<IReceipt, 'id'>) => {
            return receiptController.createReceipt({
                name,
                ingredients,
                calories,
                price,
                rates,
                image
            })
        },
        addBanner: async (_: unknown, {
            name,
            image
        }: Omit<IBanner, 'id'>) => {
            return bannerController.createBanner({
                name,
                image
            })
        }
    }
}