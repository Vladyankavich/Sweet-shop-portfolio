import { Product } from "./product.js";
import { FRUIT_CANDIES_CATEGORY, CANDIES_IN_BOXES_CATEGORY, GIFT_SETS_CATEGORY, SELECTED_PRODUCT } from "./constants.js"
import { CATALOGFRUITCANDIES } from "./catalog-fruit-candies.js";
import { CATALOGCANDIESINBOXES } from "./catalog-candies-in-boxes.js";
import { CATALOGGIFTSETS } from "./catalog-gift-sets.js";

export class ProductManager {
    saveSelectedProduct(product) {
        sessionStorage.setItem(SELECTED_PRODUCT, JSON.stringify(product));
    }

    loadSelectedProduct(productsByCategories) {
        const selectedProduct = JSON.parse(sessionStorage.getItem(SELECTED_PRODUCT));
        const product = productsByCategories.get(selectedProduct.category)[selectedProduct.id];

        return product;
    }

    createProducts(category, catalog) {
        const products = [];

        catalog.forEach(product => {
            products.push(new Product(product.id, product.name, product.price, product.image, product.description, category));
        })

        return products;
    }

    createAllProducts() {
        const productsByCategory = new Map([
            [FRUIT_CANDIES_CATEGORY, this.createProducts(FRUIT_CANDIES_CATEGORY, [...CATALOGFRUITCANDIES])],
            [CANDIES_IN_BOXES_CATEGORY, this.createProducts(CANDIES_IN_BOXES_CATEGORY, [...CATALOGCANDIESINBOXES])],
            [GIFT_SETS_CATEGORY, this.createProducts(GIFT_SETS_CATEGORY, [...CATALOGGIFTSETS])]
        ]);

        return productsByCategory;
    }
}