import { ProductCard } from "./product-card.js"

export class ProductCardManager {
    // Створюємо картку продукту
    createProductCardHTML(product) {

        const productCard = document.createElement("div");
        productCard.classList.add("card");

        const cardGroup = document.createElement("a");
        cardGroup.classList.add("card_group");
        cardGroup.setAttribute('href', "./Page/product-page-index.html");

        const cardImage = document.createElement("div");
        cardImage.classList.add("card_image");
        cardImage.innerHTML = `<img src=${product.image} alt="${product.name}">`;

        const cardName = document.createElement("div");
        cardName.classList.add("card_name");
        cardName.innerHTML = `${product.name}`;

        cardGroup.append(cardImage, cardName);

        const cardPrice = document.createElement("div");
        cardPrice.classList.add("card_price");
        cardPrice.innerHTML = `${product.price} грн`;

        const cardCount = document.createElement("div");
        cardCount.classList.add("card_count");

        const btnMinus = document.createElement("button");
        btnMinus.classList.add("btn_minus");
        btnMinus.innerHTML = `-`;

        const count = document.createElement("div");
        count.classList.add("count");
        count.innerHTML = `${product.count}`;

        const btnPlus = document.createElement("button");
        btnPlus.classList.add("btn_plus");
        btnPlus.innerHTML = `+`;

        cardCount.append(btnMinus, count, btnPlus);

        const cardButton = document.createElement("div");
        cardButton.classList.add("card_button");
        cardButton.innerHTML = `Купити`;

        productCard.append(cardGroup, cardPrice, cardCount, cardButton);

        return productCard;

    }

    updateProductCardHTML(product, productCard, inBascet) {
        const productsCountText = productCard.codeHTML.querySelector(".count");
        const productBuyButton = productCard.codeHTML.querySelector(".card_button");        
        const productPriceText = productCard.codeHTML.querySelector(".card_price");
    
        if (inBascet) {
            productBuyButton.innerText = "У кошику";
            productBuyButton.style.backgroundColor = "white";
            productBuyButton.style.color = "#78181f";
        }
        else{
            productBuyButton.innerText = "Купити";
            productBuyButton.style.backgroundColor = "#78181f";
            productBuyButton.style.color = "white";
        }
    
        productsCountText.innerText = `${product.count}`;
        productPriceText.innerText = `${product.price} грн`;
    }

    createProductCardForBascetHTML(product) {

        const cardBascet = document.createElement("div");
        cardBascet.classList.add("card_bascet");

        const cardBascetImage = document.createElement("div");
        cardBascetImage.classList.add("card_bascet_image");
        cardBascetImage.innerHTML = `<img src=".${product.image}" alt="${product.name}">`

        const cardBascetGroup = document.createElement("div");
        cardBascetGroup.classList.add("card_bascet_group");

        const cardBascetName = document.createElement("div");
        cardBascetName.classList.add("card_bascet_name");
        cardBascetName.innerHTML = `${product.name}`;

        const cardBascetNamePrice = document.createElement("div");
        cardBascetNamePrice.classList.add("card_bascet_name_price");
        cardBascetNamePrice.innerHTML = `${product.price} грн`;

        cardBascetGroup.append(cardBascetName, cardBascetNamePrice);

        const cardBascetCount = document.createElement("div");
        cardBascetCount.classList.add("card_bascet_count");

        const btnMinus = document.createElement("button");
        btnMinus.classList.add("btn_minus");
        btnMinus.innerHTML = `-`;

        const count = document.createElement("div");
        count.classList.add("count");
        count.innerHTML = `${product.count}`;

        const btnPlus = document.createElement("button");
        btnPlus.classList.add("btn_plus");
        btnPlus.innerHTML = `+`;

        cardBascetCount.append(btnMinus, count, btnPlus);

        const cardBascetPrice = document.createElement("div");
        cardBascetPrice.classList.add("card_bascet_price");
        cardBascetPrice.innerHTML = `${product.totalPrice()} грн`;

        const cardBascetCross = document.createElement("div");
        cardBascetCross.classList.add("card_bascet_cross");
        cardBascetCross.innerHTML = `<img src="../Image/icon/cross.svg" alt="cross">`

        cardBascet.append(cardBascetImage, cardBascetGroup, cardBascetCount, cardBascetPrice, cardBascetCross);

        return cardBascet;

    }

    updateProductCardForBascetHTML(product, productCard) {
        const productsCountText = productCard.codeHTML.querySelector(".count");      
        const productPriceText = productCard.codeHTML.querySelector(".card_bascet_price");
    
        productsCountText.innerText = `${product.count}`;
        productPriceText.innerText = `${product.totalPrice()} грн`;
    }

    // Метод створення масиву карток
    createProductCards(products) {
        const productCards = [];

        products.forEach(product => {
            const productCard = new ProductCard(product.id, product.category, this.createProductCardHTML(product));

            productCards.push(productCard);
        });

        return productCards;
    }

    createAllProductCards(productsByCategories) {
        const productCardsByCategories = new Map();

        productsByCategories.forEach((product, productCategory) => {
            productCardsByCategories.set(productCategory, this.createProductCards(product));
        });

        return productCardsByCategories;
    }

    // Метод створення масиву карток для корзини
    createProductCardsForBascet(productsFromBascet) {
        const productCardsByCategories = new Map();

        productsFromBascet.forEach(product => {
            const productCard = new ProductCard(product.id, product.category, this.createProductCardForBascetHTML(product));

            if (productCardsByCategories.has(product.category)) {
                const productCards = productCardsByCategories.get(product.category);
                productCards.push(productCard);
            } else {
                const productCards = [productCard];
                productCardsByCategories.set(product.category, productCards);
            }
        });

        return productCardsByCategories;
    }

    removeProductCardForBascet(productCards, product) {
        for (let i = 0; i < productCards.length; i++) {
            const productCard = productCards[i];

            if (productCard.id == product.id && productCard.category == product.category) {
                productCards.splice(i, 1);

                break;
            }
        }
    }

    // Метод сортування карточок товарів
    sortingProductCards(productCardsByCategories, productsByCategories, comparison) {
        const sortedProductCardsByCategories = new Map();

        productCardsByCategories.forEach((productCards, productCategory) => {
            const sortedProductCards = [];

            productCards.forEach(productCard => {
                const product = productsByCategories.get(productCategory)[productCard.id];

                if (comparison(product)) {
                    sortedProductCards.push(productCard);
                }
            });

            sortedProductCardsByCategories.set(productCategory, sortedProductCards);
        });

        return sortedProductCardsByCategories;
    }

    // Метод сортування карточок товарів по категоріям
    sortingProductCardsByCategories(productCardsByCategories, categories) {
        const sortedProductCardsByCategories = new Map();

        categories.forEach(category => {
            sortedProductCardsByCategories.set(category, productCardsByCategories.get(category));
        });

        return sortedProductCardsByCategories;
    }

    // Метод випадкового вибору карток з каталогу продуктів
    getRandomProductCards(productCards, count) {
        const randomProducts = []; // Ствозюємо пустий масив, куди будемо додавати товари

        for (let i = 0; i < count; i++) {
            const randomProductIndex = Math.floor(Math.random() * productCards.length); // Отримуємо випадковий індекс товару
            randomProducts.push(productCards[randomProductIndex]); // Додаємо в масив товар 
            // productCards.splice(randomProductIndex, 1); // Видаляємо вибраний товар з копії каталогу
        }

        return randomProducts;
    }

    // Метод вибору з масиву картки продукту, в якій натиснута кнопка "Купити"
    subscribeToBuyButtonClickInProductCards(productCards, callback) {
        productCards.forEach(productCard => {
            productCard.subscribeToBuyButtonClick(() => {
                callback(productCard);
            });
        });
    }

    // Метод натиску картки продукту, щоб відкрити окрему картку цього продукту
    subscribeToOpenProductPageButtonClickInProductCards(productCards, callback) {
        productCards.forEach(productCard => {
            productCard.subscribeToOpenProductPageButtonClick(() => {
                callback(productCard);
            });
        });
    }

    // Метод натиску кнопки видалення товару з корзини
    subscribeToRemoveProductFromBascetButtonClickInProductCards(productCards, callback) {
        productCards.forEach(productCard => {
            productCard.subscribeToRemoveProductFromBascetButtonClick(() => {
                callback(productCard);
            });
        });
    }

    // Метод збільшення кількості певного товару в корзині
    subscribeToIncreaseCountButtonClickInProductCards(productCards, callback) {
        productCards.forEach(productCard => {
            productCard.subscribeToIncreaseCountButtonClick(() => {
                callback(productCard);
            });
        });
    }

    // Метод зменшення кількості певного товару в корзині
    subscribeToReduceCountButtonClickInProductCards(productCards, callback) {
        productCards.forEach(productCard => {
            productCard.subscribeToReduceCountButtonClick(() => {
                callback(productCard);
            });
        });
    }
}