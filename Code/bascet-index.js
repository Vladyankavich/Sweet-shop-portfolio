function displayProductCardsHTML(productCardsByCategories, productsByCategories) {
    const cards = document.querySelector(".main-bascet");
    const totalPriceText = document.querySelector(".footer-bascet-price span");
    let totalPrice = 0;

    cards.innerHTML = "";

    productCardsByCategories.forEach((productCards, productCategory) => {
        productCards.forEach(productCard => {
            const product = productsByCategories.get(productCategory)[productCard.id];
            const productsCountText = productCard.codeHTML.querySelector(".count");
            const productPriceText = productCard.codeHTML.querySelector(".card_bascet_price");

            totalPrice += product.totalPrice();
            productsCountText.innerText = `${product.count}`;
            productPriceText.innerText = `${product.totalPrice()}`;

            cards.append(productCard.codeHTML);
        });
    });

    totalPriceText.innerText = totalPrice;
}

window.addEventListener("DOMContentLoaded", () => {
    const bascetManager = new BascetManager();
    const productManager = new ProductManager();
    const productCardManager = new ProductCardManager();
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