class ProductManager {
    saveSelectedProduct(product) {
        sessionStorage.setItem(SELECTED_PRODUCT, JSON.stringify(product));
    }

    createProducts(category, catalog){
        const products = [];

        catalog.forEach(product => {
            products.push(new Product(product.id, product.name, product.price, product.image, product.description, category));
        })

        return products;
    }

    createAllProducts() {
        const productsByCategory = new Map([
            [FRUIT_CANDIES_CATEGORY, this.createProducts(FRUIT_CANDIES_CATEGORY, [...CATALOGFRUITCANDIES])],
            [CANDIES_IN_BOXES_CATEGORY, this.createProducts(CANDIES_IN_BOXES_CATEGORY, [...CATALOGCANDIESINBOXES])],
            [GIFT_SETS_CATEGORY, this.createProducts(GIFT_SETS_CATEGORY, [...CATALOGGIFTSETS])]
        ]);

        return productsByCategory;
    }
}