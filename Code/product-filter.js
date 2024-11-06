class ProductFilter {
    constructor() {
        this.selectedCategories = new Set();
    }

    // Метод підписки на подію натиску кнопки-прапору у фільтрі
    subscribeToButtonChange(callback){
        const fruitCandyBtn = document.querySelector(".fruit-candy");
        const candiesInBoxesBtn = document.querySelector(".candies-in-boxes");
        const giftSetsBtn = document.querySelector(".gift-sets");

        fruitCandyBtn.addEventListener("change", (state) => {
            if(state.target.checked) {
                this.selectedCategories.add(FRUIT_CANDIES_CATEGORY);
            }else {
                this.selectedCategories.delete(FRUIT_CANDIES_CATEGORY);
            }

            callback();
        });
        candiesInBoxesBtn.addEventListener("change", (state) => {
            if(state.target.checked) {
                this.selectedCategories.add(CANDIES_IN_BOXES_CATEGORY);
            }else {
                this.selectedCategories.delete(CANDIES_IN_BOXES_CATEGORY);
            }

            callback();
        });
        giftSetsBtn.addEventListener("change", (state) => {
            if(state.target.checked) {
                this.selectedCategories.add(GIFT_SETS_CATEGORY);
            }else {
                this.selectedCategories.delete(GIFT_SETS_CATEGORY);
            }

            callback();
        });
    }

}