class ProductManager {
    createProducts(category, catalog){
        const products = [];

        for (let i = 0; i < catalog.length; i++) {
            const data = catalog[i];
            products.push(new Product(i, data.name, data.price, data.image, data.description, category));
        }

        return products;
    }
}