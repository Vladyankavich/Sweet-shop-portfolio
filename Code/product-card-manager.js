class ProductCardManager {
    // Створюємо картку продукту
    createProductCardHTML(product){
        
        const card = document.createElement("div");
        card.classList.add("card");

        const cardGroup = document.createElement("a");
        cardGroup.classList.add("card_group");
        cardGroup.setAttribute('href',"./Page/product-page-index.html")
        
        const cardImage = document.createElement("div");
        cardImage.classList.add("card_image");
        cardImage.innerHTML = `<img src=${product.image} alt="${product.name}">`

        const cardName = document.createElement("div");
        cardName.classList.add("card_name");
        cardName.innerHTML = `${product.name}`;

        cardGroup.append(cardImage, cardName)

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
        count.innerHTML = `1`;

        const btnPlus = document.createElement("button");
        btnPlus.classList.add("btn_plus");
        btnPlus.innerHTML = `+`;
        
        cardCount.append(btnMinus, count, btnPlus);

        const cardButton = document.createElement("div");
        cardButton.classList.add("card_button");
        cardButton.innerHTML = `Купити`;

        card.append(cardGroup, cardPrice, cardCount, cardButton);
        
        return card;

    }

    // Метод створення масиву карток
    createProductCardsHTML(products){
        const cards = [];

        products.forEach(product => {
            const card = new ProductCard(product.id, this.createProductCardHTML(product));

            cards.push(card);
        });

        return cards;
    }

    // Метод випадкового вибору карток з каталогу продуктів
    getRandomProductCards(cards, count) {
        const randomProducts = []; // Ствозюємо пустий масив, куди будемо додавати товари
                
        for (let i = 0; i < count; i++) {
            const randomProductIndex = Math.floor(Math.random() * cards.length); // Отримуємо випадковий індекс товару
            randomProducts.push(cards[randomProductIndex]); // Додаємо в масив товар 
            // cards.splice(randomProductIndex, 1); // Видаляємо вибраний товар з копії каталогу
        }
        
        return randomProducts;
    }

    // Метод вибору з масиву картки продукту, в якій натиснута кнопка "Купити"
    subscribeToBuyButtonClickInProductCards(cards, products, bascet) {
        cards.forEach(card => {
            card.subscribeToBuyButtonClick(() => {
                const product = products[card.id];
                console.log(products[card.id]);            
            })
        });
    }

    // Метод натиску картки продукту, щоб відкрити окрему картку цього продукту
    subscribeToOpenProductPageButtonClickInProductCards(cards, products) {
        cards.forEach(card => {
            card.subscribeToOpenProductPageButtonClick(() => {
                const product = products[card.id];
                
                sessionStorage.setItem("selectedProduct", JSON.stringify(product));
                                           
            })
        });
    }
}