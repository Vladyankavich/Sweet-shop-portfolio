class ProductCard {
    constructor(id, codeHTML){
        this.id = id; 
        this.codeHTML = codeHTML;
    }

    subscribeToBuyButtonClick(callback){
        const btn = this.codeHTML.querySelector(".card_button");

        btn.addEventListener("click", callback);
    }

    subscribeToOpenProductPageButtonClick (callback) {
        const btn = this.codeHTML.querySelector(".card_group");

        btn.addEventListener("click", callback)
    }
}