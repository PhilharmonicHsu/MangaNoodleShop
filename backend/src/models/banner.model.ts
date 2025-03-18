import { Banner } from "types/banner";

const banners: Banner[] = [
    {
        id: "lefkwopq",
        name: "Buy one get one free offer",
        image: "ad-banner01.jpeg"
    },
    {
        id: "rlneiwjg;",
        name: "30% off all items limited time offer",
        image: "ad-banner02.jpeg"
    },
    {
        id: "leifj;q",
        name: "Order noodles and get drinks",
        image: "ad-banner03.jpeg"
    }
]

class BannerModel {
    findAll() {
        return banners;
    }
}

export default new BannerModel