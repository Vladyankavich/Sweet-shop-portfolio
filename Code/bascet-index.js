function displayProductCards(productCards, productsByCategories) {
    const cards = document.querySelector(".main-bascet");
    const totalPriceText = document.querySelector(".footer-bascet-price span");
    let totalPrice = 0;

    cards.innerHTML = "";

    productCards.forEach(productCard => {
        const product = productsByCategories.get(productCard.category)[productCard.id];
        totalPrice += product.price * product.count;

        cards.append(productCard.codeHTML);
    });

    totalPriceText.innerText = totalPrice;
}

window.addEventListener("DOMContentLoaded", () => {
    const bascetManager = new BascetManager();
    const productManager = new ProductManager();
    const productCardManager = new ProductCardManager();
    const productsByCategories = productManager.createAllProducts();
    const bascet = bascetManager.loadBascet(productsByCategories);
    const productCards = productCardManager.createProductCardsForBascet(bascet.products);
    
    productCardManager.subscribeToRemoveProductFromBascetButtonClickInProductCards(productCards, (productCard) => {
        const product = productsByCategories.get(productCard.category)[productCard.id];

        bascet.remove(product);
        bascetManager.saveBascet(bascet);
        productCardManager.removeProductCardForBascet(productCards, product);

        displayProductCards(productCards, productsByCategories);
    });

    displayProductCards(productCards, productsByCategories);
})