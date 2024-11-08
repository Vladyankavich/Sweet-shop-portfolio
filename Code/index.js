function updateProductCardInfoHTML(product, productCard, bascet) {
    const productsCountText = productCard.codeHTML.querySelector(".count");
    const productBuyButton = productCard.codeHTML.querySelector(".card_button");

    if (bascet.has(product)) {
        productBuyButton.innerText = "У кошику";
    }

    productsCountText.innerText = `${product.count}`;
}

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

            updateProductCardInfoHTML(product, productCard, bascet);
        });
    });
}

window.addEventListener("DOMContentLoaded", () => {
    //Змінні
    const productFilter = new ProductFilter();
    const productManager = new ProductManager();
    const productCardManager = new ProductCardManager();
    const bascetManager = new BascetManager();
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

            updateBascetInfoHTML(bascet);
            updateProductCardInfoHTML(product, productCard, bascet);
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

            updateBascetInfoHTML(bascet);
            updateProductCardInfoHTML(product, productCard, bascet);
        });

        productCardManager.subscribeToReduceCountButtonClickInProductCards(productCards, (productCard) => {
            const product = productsByCategories.get(productCategory)[productCard.id];

            if (product.count > MIN_PRODUCTS_COUNT) {
                product.count--;
            }

            bascetManager.saveBascet(bascet);

            updateBascetInfoHTML(bascet);
            updateProductCardInfoHTML(product, productCard, bascet);
        });
    });

    displayProductCardsHTML(productCardsByCategories, productsByCategories, bascet);
    updateBascetInfoHTML(bascet);
})