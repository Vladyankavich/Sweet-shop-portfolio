import { ProductManager } from "./product-manager.js";
import { ProductCardManager } from "./product-card-manager.js";
import { BascetManager } from "./bascet-manager.js";
import { MAX_PRODUCTS_COUNT, MIN_PRODUCTS_COUNT } from "./constants.js";

const bascetManager = new BascetManager();
const productManager = new ProductManager();
const productCardManager = new ProductCardManager();

function displayProductCardsHTML(productCardsByCategories, productsByCategories) {
    const cards = document.querySelector(".main-bascet");
    const totalPriceText = document.querySelector(".footer-bascet-price span");
    let totalPrice = 0;

    cards.innerHTML = "";

    productCardsByCategories.forEach((productCards, productCategory) => {
        productCards.forEach(productCard => {
            const product = productsByCategories.get(productCategory)[productCard.id];
            
            totalPrice += product.totalPrice();
            
            cards.append(productCard.codeHTML);
            productCardManager.updateProductCardForBascetHTML(product, productCard);
        });
    });

    totalPriceText.innerText = totalPrice;
}

window.addEventListener("DOMContentLoaded", () => {
    const productsByCategories = productManager.createAllProducts();
    const bascet = bascetManager.loadBascet(productsByCategories);
    const productCardsByCategories = productCardManager.createProductCardsForBascet(bascet.products);
    console.log(productCardsByCategories);

    productCardsByCategories.forEach((productCards, productCategory) => {
        productCardManager.subscribeToRemoveProductFromBascetButtonClickInProductCards(productCards, (productCard) => {
            const product = productsByCategories.get(productCategory)[productCard.id];

            bascet.remove(product);
            bascetManager.saveBascet(bascet);
            productCardManager.removeProductCardForBascet(productCards, product);

            displayProductCardsHTML(productCardsByCategories, productsByCategories);
        });

        productCardManager.subscribeToIncreaseCountButtonClickInProductCards(productCards, (productCard) => {
            const product = productsByCategories.get(productCategory)[productCard.id];
            
            if(product.count < MAX_PRODUCTS_COUNT) {
                product.count++;
            }

            bascetManager.saveBascet(bascet);

            displayProductCardsHTML(productCardsByCategories, productsByCategories);
        });

        productCardManager.subscribeToReduceCountButtonClickInProductCards(productCards, (productCard) => {
            const product = productsByCategories.get(productCategory)[productCard.id];
            
            if(product.count > MIN_PRODUCTS_COUNT) {
                product.count--;
            }

            bascetManager.saveBascet(bascet);

            displayProductCardsHTML(productCardsByCategories, productsByCategories);
        });
    });

    displayProductCardsHTML(productCardsByCategories, productsByCategories);
})