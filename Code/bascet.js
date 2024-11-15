export class Bascet {
    constructor() {
        this.products = [];
    }

    empty() {
        return (this.products.length === 0);
    }

    toJSON() {
        return this.products;
    }

    has(product) {
        let matching = false;

        this.products.forEach(productFromBascet => {
            if (productFromBascet.id == product.id && productFromBascet.category == product.category) {
                matching = true;

                return;
            }
        });

        return matching;
    }

    add(product) {
        if (!this.has(product)) {
            this.products.push(product);
        }
    }

    remove(product) {
        for (let i = 0; i < this.products.length; i++) {
            const productFromBascet = this.products[i];

            if (productFromBascet.id == product.id && productFromBascet.category == product.category) {
                this.products.splice(i, 1);
                
                break;
            }
        }
    }

    subscribeToOpenBascetButton(callback) {
        const btn = document.querySelector(".logo_bascet");

        btn.addEventListener("click", () => {
            const modalWindow = document.querySelector(".bascet_modal")
            modalWindow.classList.add("open");

            callback();
        });
    }

    subscribeToCloseBascetButton(callback) {
        const btn = document.querySelector(".header_bascet_cross");

        btn.addEventListener("click", () => {
            const modalWindow = document.querySelector(".bascet_modal")
            modalWindow.classList.remove("open");

            callback();
        });
    }
}