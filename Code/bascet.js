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
}