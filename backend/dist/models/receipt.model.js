"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const receipts = [
    {
        id: "uewnhdofiluhq",
        name: "Tonkotsu Ramen",
        ingredients: [
            "Tonkotsu broth",
            "ramen",
            "barbecued pork",
            "soft-boiled eggs",
            "seaweed",
            "green onions",
            "black fungus"
        ],
        calories: 650,
        price: 13.99,
        rates: 5,
        image: "01.jpeg",
    },
    {
        id: "nvwpflbueidwv",
        name: "Carbonara Pasta",
        ingredients: [
            "Spaghetti",
            "pancetta",
            "egg yolk",
            "Parmesan cheese",
            "black pepper"
        ],
        calories: 550,
        price: 12.49,
        rates: 4,
        image: "02.jpeg",
    },
    {
        id: "ckfdw;miofv[",
        name: "Taiwanese Beef Noodles",
        ingredients: [
            "Beef broth",
            "beef shank",
            "ramen noodles",
            "bok choy",
            "pickled mustard greens"
        ],
        calories: 700,
        price: 14.99,
        rates: 5,
        image: "03.jpeg",
    },
    {
        id: "fpn8ev1ijnwpq",
        name: "Spicy Tteokbokki Ramen",
        ingredients: [
            "Korean ramen",
            "tteok (rice cakes)",
            "gochujang",
            "fish cakes",
            "scallions",
            "sesame seeds"
        ],
        calories: 650,
        price: 11.99,
        rates: 4,
        image: "04.jpeg",
    },
    {
        id: "veubfhwo",
        name: "Dan Dan Noodles",
        ingredients: [
            "Thin wheat noodles",
            "peanut butter",
            "sesame paste",
            "chili oil",
            "Sichuan peppercorns",
            "scallions",
            "crushed peanuts"
        ],
        calories: 500,
        price: 10.99,
        rates: 4,
        image: "05.jpeg",
    },
    {
        id: "wpiomjcdq-cj",
        name: "Tom Yum Seafood Noodles",
        ingredients: [
            "Tom Yum broth",
            "shrimp",
            "clams",
            "lemongrass",
            "kaffir lime leaves",
            "thin rice noodles"
        ],
        calories: 550,
        price: 13.49,
        rates: 5,
        image: "06.jpeg",
    },
    {
        id: "dlknwfrcoqxm",
        name: "Vietnamese Pho",
        ingredients: [
            "Beef broth",
            "rice noodles",
            "raw beef slices",
            "Thai basil",
            "bean sprouts",
            "onions",
            "lime"
        ],
        calories: 480,
        price: 12.99,
        rates: 5,
        image: "07.jpeg",
    },
    {
        id: "lkuwqdvfndqk",
        name: "Mac & Cheese",
        ingredients: [
            "Elbow macaroni",
            "cheddar cheese",
            "milk",
            "butter",
            "flour"
        ],
        calories: 650,
        price: 9.99,
        rates: 4,
        image: "08.jpeg",
    },
    {
        id: "lkjnfwmpck[",
        name: "Truffle Cream Pasta",
        ingredients: [
            "Pasta",
            "truffle sauce",
            "cream",
            "Parmesan cheese"
        ],
        calories: 600,
        price: 15.99,
        rates: 5,
        image: "09.jpeg",
    },
];
class ReceiptModel {
    findAll() {
        return receipts;
    }
    getReceiptById(id) {
        return receipts.find(receipt => receipt.id === id);
    }
}
exports.default = new ReceiptModel;
