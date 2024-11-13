import { FRUIT_CANDIES_CATEGORY, CANDIES_IN_BOXES_CATEGORY, GIFT_SETS_CATEGORY, MIN_PRODUCT_PRICE, MAX_PRODUCT_PRICE, DEFAULT_PRODUCT_PRICE } from "./constants.js"

export class ProductFilter {
    constructor() {
        this.selectedCategories = new Set();
        this.minPrice = MIN_PRODUCT_PRICE;
        this.maxPrice = DEFAULT_PRODUCT_PRICE;
        this.active = false;

        this.reset();
    }

    // Метод для скидання ціни та категорії товару в фільтрі
    reset() {
        const fruitCandyBtn = document.querySelector(".fruit_candy");
        const candiesInBoxesBtn = document.querySelector(".candies_in_boxes");
        const giftSetsBtn = document.querySelector(".gift_sets");
        const priceMinInput = document.querySelector(".price_min");
        const priceMaxInput = document.querySelector(".price_max");        
        
        this.selectedCategories.clear();
        this.minPrice = MIN_PRODUCT_PRICE;
        this.maxPrice = DEFAULT_PRODUCT_PRICE;
        this.active = false;

        fruitCandyBtn.checked = false;
        candiesInBoxesBtn.checked = false;
        giftSetsBtn.checked = false;

        priceMinInput.value = this.minPrice;
        priceMaxInput.value = this.maxPrice;
    }

    // Метод перевірки ціни в заданому діапазоні
    checkPriceRange(price) {
        return (price >= this.minPrice && price <= this.maxPrice);
    }

    // Метод відображення кнопки "Очистити фільтр"
    displayResetButton() {
        const resetBtn = document.querySelector(".reset");

        if (this.active || this.selectedCategories.size > 0) {
            resetBtn.style.display = 'block';
        } else {
            resetBtn.style.display = 'none';
        }
    }

    // Метод підписки на подію натиску кнопки-прапору у фільтрі
    subscribeToProductCategoryButtonChange(callback) {
        const fruitCandyBtn = document.querySelector(".fruit_candy");
        const candiesInBoxesBtn = document.querySelector(".candies_in_boxes");
        const giftSetsBtn = document.querySelector(".gift_sets");

        fruitCandyBtn.addEventListener("change", (state) => {
            if (state.target.checked) {
                this.selectedCategories.add(FRUIT_CANDIES_CATEGORY);
            } else {
                this.selectedCategories.delete(FRUIT_CANDIES_CATEGORY);
            }

            this.displayResetButton();

            callback();
        });
        candiesInBoxesBtn.addEventListener("change", (state) => {
            if (state.target.checked) {
                this.selectedCategories.add(CANDIES_IN_BOXES_CATEGORY);
            } else {
                this.selectedCategories.delete(CANDIES_IN_BOXES_CATEGORY);
            }

            this.displayResetButton();

            callback();
        });
        giftSetsBtn.addEventListener("change", (state) => {
            if (state.target.checked) {
                this.selectedCategories.add(GIFT_SETS_CATEGORY);
            } else {
                this.selectedCategories.delete(GIFT_SETS_CATEGORY);
            }

            this.displayResetButton();

            callback();
        });
    }

    // Метод підписки на натиск кнопки "ОК" в ціні фільтра
    subscribeToConfirmButton(callback) {
        const confirmBtn = document.querySelector(".price_confirm");
        const priceMinInput = document.querySelector(".price_min");
        const priceMaxInput = document.querySelector(".price_max");

        confirmBtn.addEventListener("click", () => {
            this.minPrice = priceMinInput.value;
            this.maxPrice = priceMaxInput.value;
            this.active = true;

            this.displayResetButton();

            callback();
        })
    }

    // Метод підписки щчищення вибраних фільтрів
    subscribeToResetButton(callback) {
        const resetBtn = document.querySelector(".reset_btn");

        resetBtn.addEventListener("click", () => {
            this.reset();
            this.displayResetButton();

            callback();
        })
    }
}