"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const banners = [
    {
        id: "lefkwopq",
        name: "Buy one get one free offer",
        image: "banner01.jpeg"
    },
    {
        id: "rlneiwjg;",
        name: "30% off all items limited time offer",
        image: "banner02.jpeg"
    },
    {
        id: "leifj;q",
        name: "Order noodles and get drinks",
        image: "banner03.jpeg"
    }
];
class BannerModel {
    findAll() {
        return banners;
    }
}
exports.default = new BannerModel;
