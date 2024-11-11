import { ProductFilter } from "./product-filter.js";
import { ProductManager } from "./product-manager.js";
import { ProductCardManager } from "./product-card-manager.js";
import { BascetManager } from "./bascet-manager.js";
import { MAX_PRODUCTS_COUNT, MIN_PRODUCTS_COUNT } from "./constants.js";

const productManager = new ProductManager();
const productCardManager = new ProductCardManager();
const bascetManager = new BascetManager();

function updateBascetInfoHTML(bascet) {
    const productsCountText = document.querySelector(".logo-bascet-count");
    let productsCount = 0;

    bascet.products.forEach(product => {
        productsCount += product.count;
    })

    productsCountText.innerText = `${productsCount}`;
}

function displayProductCardsHTML(productCardsByCategories, productsByCategories, bascet) {
    const cards = document.querySelector(".cards"); // Змінна блоку для виводу карток

    productCardsByCategories.forEach((productCards, productCategory) => {
        productCards.forEach(productCard => {
            const product = productsByCategories.get(productCategory)[productCard.id];

            cards.append(productCard.codeHTML);
            productCardManager.updateProductCardHTML(product, productCard, bascet.has(product));
        });
    });
}

window.addEventListener("DOMContentLoaded", () => {
    //Змінні
    const productFilter = new ProductFilter();
    const productsByCategories = productManager.createAllProducts();
    const bascet = bascetManager.loadBascet(productsByCategories);
    const productCardsByCategories = productCardManager.createAllProductCards(productsByCategories);

    productFilter.subscribeToButtonChange(() => {
        const cards = document.querySelector(".cards"); // Змінна блоку для виводу карток

        cards.innerHTML = [];

        if (productFilter.selectedCategories.size > 0) {
            productFilter.selectedCategories.forEach(selectedCategory => {
                productCardsByCategories.get(selectedCategory).forEach(productCard => {
                    cards.append(productCard.codeHTML);
                });
            });
        } else {
            displayProductCardsHTML(productCardsByCategories, productsByCategories, bascet);
        }
    });

    productCardsByCategories.forEach((productCards, productCategory) => {

        productCardManager.subscribeToBuyButtonClickInProductCards(productCards, (productCard) => {
            const product = productsByCategories.get(productCategory)[productCard.id];

            bascet.add(product);
            bascetManager.saveBascet(bascet);
            productCardManager.updateProductCardHTML(product, productCard, bascet.has(product));

            updateBascetInfoHTML(bascet);
        });

        productCardManager.subscribeToOpenProductPageButtonClickInProductCards(productCards, (productCard) => {
            const product = productsByCategories.get(productCategory)[productCard.id];

            productManager.saveSelectedProduct(product);
        });

        productCardManager.subscribeToIncreaseCountButtonClickInProductCards(productCards, (productCard) => {
            const product = productsByCategories.get(productCategory)[productCard.id];

            if (product.count < MAX_PRODUCTS_COUNT) {
                product.count++;
            }

            bascetManager.saveBascet(bascet);
            productCardManager.updateProductCardHTML(product, productCard, bascet.has(product));

            updateBascetInfoHTML(bascet);
        });

        productCardManager.subscribeToReduceCountButtonClickInProductCards(productCards, (productCard) => {
            const product = productsByCategories.get(productCategory)[productCard.id];

            if (product.count > MIN_PRODUCTS_COUNT) {
                product.count--;
            }

            bascetManager.saveBascet(bascet);
            productCardManager.updateProductCardHTML(product, productCard, bascet.has(product));

            updateBascetInfoHTML(bascet);
        });
    });

    displayProductCardsHTML(productCardsByCategories, productsByCategories, bascet);
    updateBascetInfoHTML(bascet);
})