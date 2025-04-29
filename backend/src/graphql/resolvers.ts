import GraphReceiptController from '../controllers/graph_receipt.controller'
import GraphBannerController from '../controllers/graph_banner.controller'
import { Receipt as IReceipt } from 'types/receipt'
import { Banner as IBanner } from 'types/banner'

export const resolvers = {
    Query: {
        receipts: async () => GraphReceiptController.getReceipts(),
        banners: async () => GraphBannerController.getBanners()
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
            return GraphReceiptController.createReceipt({
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
            return GraphBannerController.createBanner({
                name,
                image
            })
        }
    }
}