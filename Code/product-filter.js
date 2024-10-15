class ProductFilter {
    constructor() {
        this.isFruitCandy = false,
        this.isCandiesInBoxes = false,
        this.isGiftSets = false
    }

    // Метод підписки на подію натиску кнопки-прапору у фільтрі
    subscribeToButtonChange(callback){
        const fruitCandyBtn = document.querySelector(".fruit-candy");
        const candiesInBoxesBtn = document.querySelector(".candies-in-boxes");
        const giftSetsBtn = document.querySelector(".gift-sets");

        fruitCandyBtn.addEventListener("change", (state) => {
            this.isFruitCandy = state.target.checked;

            callback();
        });
        candiesInBoxesBtn.addEventListener("change", (state) => {
            this.isCandiesInBoxes = state.target.checked;

            callback();
        });
        giftSetsBtn.addEventListener("change", (state) => {
            this.isGiftSets = state.target.checked;

            callback();
        });
    }

}