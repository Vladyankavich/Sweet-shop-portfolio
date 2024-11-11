export class ProductPage {
    constructor(id, category, codeHTML) {
        this.id = id;
        this.category = category;
        this.codeHTML = codeHTML;
    }

    // Метод підписки на подію натиску кнопки "Купити" в картці продукту
    subscribeToBuyButtonClick(callback) {
        const btn = this.codeHTML.querySelector(".product_button");

        btn.addEventListener("click", callback);
    }

    // Метод підписки на подію натиску кнопки "+" в лічильнику кількості товарів
    subscribeToIncreaseCountButtonClick(callback) {
        const btn = this.codeHTML.querySelector(".product_btn_plus");

        btn.addEventListener("click", callback);
    }

    // Метод підписки на подію натиску кнопки "-" в лічильнику кількості товарів
    subscribeToReduceCountButtonClick(callback) {
        const btn = this.codeHTML.querySelector(".product_btn_minus");

        btn.addEventListener("click", callback);
    }
}