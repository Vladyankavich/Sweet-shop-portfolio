// const productManager = new ProductManager();
// const productCardManager = new ProductCardManager();

window.addEventListener("DOMContentLoaded", () => {
    // Копіюємо каталоги товарів, щоб не змінювати оригінал
    const catalogCandiesInBoxes = [...CATALOGCANDIESINBOXES];
    const catalogFruitCandies = [...CATALOGFRUITCANDIES];
    const catalogGiftSets = [...CATALOGGIFTSETS];

    //Змінні
    const productFilter = new ProductFilter();
    const productManager = new ProductManager();
    const productCardManager = new ProductCardManager();

    const candiesInBoxes = productManager.createProducts("candiesInBoxes", catalogCandiesInBoxes);
    const fruitCandies = productManager.createProducts("fruitCandies", catalogFruitCandies);
    const giftSets = productManager.createProducts("giftSets", catalogGiftSets);

    const candiesInBoxesCards = productCardManager.createProductCardsHTML(candiesInBoxes);
    const fruitCandyCards = productCardManager.createProductCardsHTML(fruitCandies);
    const giftSetsCards = productCardManager.createProductCardsHTML(giftSets);

    
    const cards = document.querySelector(".cards"); // Змінна блоку для виводу карток

    productFilter.subscribeToButtonChange(() => {
        cards.innerHTML = [];

        if(productFilter.isFruitCandy){
            fruitCandyCards.forEach(card => {
                cards.append(card.codeHTML);
            });
        }

        if(productFilter.isCandiesInBoxes){
            candiesInBoxesCards.forEach(card => {
                cards.append(card.codeHTML);
            });
        }

        if(productFilter.isGiftSets){
            giftSetsCards.forEach(card => {
                cards.append(card.codeHTML);
            });
        }

        if(!productFilter.isFruitCandy && !productFilter.isCandiesInBoxes && !productFilter.isGiftSets){
            fruitCandyCards.forEach(card => {
                cards.append(card.codeHTML);
            });
            candiesInBoxesCards.forEach(card => {
                cards.append(card.codeHTML);
            });
            giftSetsCards.forEach(card => {
                cards.append(card.codeHTML);
            });
        }
    })

    productCardManager.subscribeToBuyButtonClickInProductCards(candiesInBoxesCards, candiesInBoxes);
    productCardManager.subscribeToBuyButtonClickInProductCards(fruitCandyCards, fruitCandies);
    productCardManager.subscribeToBuyButtonClickInProductCards(giftSetsCards, giftSets);

    productCardManager.subscribeToOpenProductPageButtonClickInProductCards(candiesInBoxesCards, candiesInBoxes);
    productCardManager.subscribeToOpenProductPageButtonClickInProductCards(fruitCandyCards, fruitCandies);
    productCardManager.subscribeToOpenProductPageButtonClickInProductCards(giftSetsCards, giftSets);

    fruitCandyCards.forEach(card => {
        cards.append(card.codeHTML);
    });
    candiesInBoxesCards.forEach(card => {
        cards.append(card.codeHTML);
    });
    giftSetsCards.forEach(card => {
        cards.append(card.codeHTML);
    });



})