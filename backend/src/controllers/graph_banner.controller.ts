import { Banner } from "../models/graphql-banner.model";
import { Banner as IBanner } from "../types/banner";

const getBanners = async () => {
    const banners = await Banner.find();

    return banners;
}

const createBanner = async (data: Omit<IBanner, 'id'>) => {
    const banner = new Banner(data);

    return await banner.save();
}

export default {
    getBanners,
    createBanner
}