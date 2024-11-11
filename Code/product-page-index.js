import { ProductManager } from "./product-manager.js";
import { ProductPageManager } from "./product-page-manager.js";
import { BascetManager } from "./bascet-manager.js";
import { MAX_PRODUCTS_COUNT, MIN_PRODUCTS_COUNT } from "./constants.js";

const productManager = new ProductManager();
const bascetManager = new BascetManager();
const productPageManager = new ProductPageManager();

function displayProductPage(product, productPage, bascet) {
    const mainProductPage = document.querySelector(".main_product-page");

    productPageManager.updateProductPageHTML(product, productPage, bascet.has(product));

    mainProductPage.innerHTML = "";
    mainProductPage.append(productPage.codeHTML);
}

window.addEventListener("DOMContentLoaded", () => {
    const productsByCategories = productManager.createAllProducts();
    const bascet = bascetManager.loadBascet(productsByCategories);
    const product = productManager.loadSelectedProduct(productsByCategories);
    const productPage = productPageManager.createProductPage(product);

    productPage.subscribeToBuyButtonClick(() => {
        bascet.add(product);
        bascetManager.saveBascet(bascet);
        productPageManager.updateProductPageHTML(product, productPage, bascet.has(product));
    });

    productPage.subscribeToIncreaseCountButtonClick(() => {
        if (product.count < MAX_PRODUCTS_COUNT) {
            product.count++;
        }

        bascetManager.saveBascet(bascet);
        productPageManager.updateProductPageHTML(product, productPage, bascet.has(product));
    });

    productPage.subscribeToReduceCountButtonClick(() => {
        if (product.count > MIN_PRODUCTS_COUNT) {
            product.count--;
        }

        bascetManager.saveBascet(bascet);
        productPageManager.updateProductPageHTML(product, productPage, bascet.has(product));
    });

    displayProductPage(product, productPage, bascet);
})