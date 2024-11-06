window.addEventListener("DOMContentLoaded", () => {
    //Змінні
    const productFilter = new ProductFilter();
    const productManager = new ProductManager();
    const productCardManager = new ProductCardManager();
    const bascetManager = new BascetManager();
    const productsByCategories = productManager.createAllProducts();
    const bascet = bascetManager.loadBascet(productsByCategories);
    const productCardsByCategories = productCardManager.createAllProductCards(productsByCategories);

    const cards = document.querySelector(".cards"); // Змінна блоку для виводу карток

    productFilter.subscribeToButtonChange(() => {
        cards.innerHTML = [];

        productFilter.selectedCategories.forEach(selectedCategory => {
            productCardsByCategories.get(selectedCategory).forEach(productCard => {
                cards.append(productCard.codeHTML);
            });
        });

        if(productFilter.selectedCategories.size == 0) {
            productCardsByCategories.forEach((productCards) => {
                productCards.forEach(productCard => {
                    cards.append(productCard.codeHTML);
                });
            });
        }
    });

    productCardsByCategories.forEach((productCards, productCategory) => {
        
        productCardManager.subscribeToBuyButtonClickInProductCards(productCards, (productCard) => {
            const product = productsByCategories.get(productCategory)[productCard.id];

            bascet.add(product);
            console.log(bascet);

            bascetManager.saveBascet(bascet);
        });

        productCardManager.subscribeToOpenProductPageButtonClickInProductCards(productCards, (productCard) => {
            const product = productsByCategories.get(productCategory)[productCard.id];

            productManager.saveSelectedProduct(product);
        });
    });

    productCardsByCategories.forEach((productCards) => {
        productCards.forEach(productCard => {
            cards.append(productCard.codeHTML);
        });
    });

})