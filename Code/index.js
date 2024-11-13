import { ProductFilter } from "./product-filter.js";
import { ProductManager } from "./product-manager.js";
import { ProductCardManager } from "./product-card-manager.js";
import { BascetManager } from "./bascet-manager.js";
import { ProductSearch } from "./product-search.js";
import { MAX_PRODUCTS_COUNT, MIN_PRODUCTS_COUNT } from "./constants.js";

const productManager = new ProductManager();
const productCardManager = new ProductCardManager();
const bascetManager = new BascetManager();
const productFilter = new ProductFilter();
const productSearch = new ProductSearch();

function updateBascetInfoHTML(bascet) {
    const productsCountText = document.querySelector(".logo_bascet_count");
    let productsCount = 0;

    bascet.products.forEach(product => {
        productsCount += product.count;
    })

    productsCountText.innerText = `${productsCount}`;
}

function displayProductCardsHTML(productCardsByCategories, productsByCategories, bascet) {
    const cards = document.querySelector(".cards"); // Змінна блоку для виводу карток

    cards.innerHTML = "";

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
    const productsByCategories = productManager.createAllProducts();
    const bascet = bascetManager.loadBascet(productsByCategories);
    const productCardsByCategories = productCardManager.createAllProductCards(productsByCategories);

    productFilter.subscribeToProductCategoryButtonChange(() => {
        const sortingByPrice = productFilter.applied;
        const sortingByCategories = productFilter.selectedCategories.size > 0;
        let sortedProductCardsByCategories = new Map(productCardsByCategories);

        if (sortingByPrice) {
            sortedProductCardsByCategories =
                productCardManager.sortingProductCards(sortedProductCardsByCategories, productsByCategories, (product) => {
                    return productFilter.checkPriceRange(product.price);
                });
        }

        if (sortingByCategories) {
            sortedProductCardsByCategories =
                productCardManager.sortingProductCardsByCategories(sortedProductCardsByCategories, productFilter.selectedCategories);
        }
        
        displayProductCardsHTML(sortedProductCardsByCategories, productsByCategories, bascet);
    });

    productFilter.subscribeToConfirmButton(() => {
        const sortingByCategories = productFilter.selectedCategories.size > 0;
        let sortedProductCardsByCategories = new Map(productCardsByCategories);

        sortedProductCardsByCategories =
            productCardManager.sortingProductCards(sortedProductCardsByCategories, productsByCategories, (product) => {
                return productFilter.checkPriceRange(product.price);
            });

        if (sortingByCategories) {
            sortedProductCardsByCategories =
                productCardManager.sortingProductCardsByCategories(sortedProductCardsByCategories, productFilter.selectedCategories);
        }

        displayProductCardsHTML(sortedProductCardsByCategories, productsByCategories, bascet);
    });

    productFilter.subscribeToResetButton(() => {
        displayProductCardsHTML(productCardsByCategories, productsByCategories, bascet);
    });

    productSearch.subscribeToInput((value) => {
        const sortingByPrice = productFilter.applied;
        const sortingByCategories = productFilter.selectedCategories.size > 0;
        const sortingByName = value.length > 0;
        let sortedProductCardsByCategories = new Map(productCardsByCategories);

        if (sortingByPrice) {
            sortedProductCardsByCategories =
                productCardManager.sortingProductCards(sortedProductCardsByCategories, productsByCategories, (product) => {
                    return productFilter.checkPriceRange(product.price);
                });
        }

        if (sortingByCategories) {
            sortedProductCardsByCategories =
                productCardManager.sortingProductCardsByCategories(sortedProductCardsByCategories, productFilter.selectedCategories);
        }

        if (sortingByName) {
            sortedProductCardsByCategories =
                productCardManager.sortingProductCards(sortedProductCardsByCategories, productsByCategories, (product) => {
                    return product.name.includes(value);
                });
        }

        displayProductCardsHTML(sortedProductCardsByCategories, productsByCategories, bascet);
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