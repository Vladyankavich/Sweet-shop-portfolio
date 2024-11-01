class BascetData {
    constructor (id, category) {
        this.id= id;
        this.category = category;
    }
}

class Bascet {
    constructor () {
        this.products = [];             
    }

    toJSON(){
        return {
            products: this.products
        };
    }

    parseJSON(json) {
        this.products = json.products;
    }
}