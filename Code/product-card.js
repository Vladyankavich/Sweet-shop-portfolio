class ProductCard {
    constructor(id, category, codeHTML) {
        this.id = id;
        this.category = category;
        this.codeHTML = codeHTML;
    }

    // Метод підписки на подію натиску кнопки "Купити" в картці продукту
    subscribeToBuyButtonClick(callback) {
        const btn = this.codeHTML.querySelector(".card_button");

        btn.addEventListener("click", callback);
    }

    // Метод підписки на подію натиску на картку продукту для переходу в окрему картку цього продукту
    subscribeToOpenProductPageButtonClick(callback) {
        const btn = this.codeHTML.querySelector(".card_group");

        btn.addEventListener("click", callback)
    }

    // Метод підписки на подію натиску кнопки видалення товару з корзини
    subscribeToRemoveProductFromBascetButtonClick(callback) {
        const btn = this.codeHTML.querySelector(".card_bascet_cross");

        btn.addEventListener("click", callback);
    }

    // Метод підписки на подію натиску кнопки "+" в лічильнику кількості товарів
    subscribeToIncreaseCountButtonClick(callback) {
        const btn = this.codeHTML.querySelector(".btn_plus");

        btn.addEventListener("click", callback);
    }

    // Метод підписки на подію натиску кнопки "-" в лічильнику кількості товарів
    subscribeToReduceCountButtonClick(callback) {
        const btn = this.codeHTML.querySelector(".btn_minus");

        btn.addEventListener("click", callback);
    }
}