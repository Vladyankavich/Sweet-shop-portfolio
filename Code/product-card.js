class ProductCard {
    constructor(id, codeHTML){
        this.id = id; 
        this.codeHTML = codeHTML;
    }

    // Метод підписки на подію натиску кнопки "Купити" в картці продукту
    subscribeToBuyButtonClick(callback){
        const btn = this.codeHTML.querySelector(".card_button");

        btn.addEventListener("click", callback);
    }

    // Метод підписки на подію натиску на картку продукту для переходу в окрему картку цього продукту
    subscribeToOpenProductPageButtonClick (callback) {
        const btn = this.codeHTML.querySelector(".card_group");

        btn.addEventListener("click", callback)
    }
}