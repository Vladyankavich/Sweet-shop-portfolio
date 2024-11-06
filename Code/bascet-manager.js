class BascetManager {
    loadBascet (productsByCategories) {
        const productsFromBascet = JSON.parse(sessionStorage.getItem(BASCET));
        const bascet = new Bascet();

        if(productsFromBascet != null) {
            productsFromBascet.forEach(productFromBascet => {
                const products = productsByCategories.get(productFromBascet.category);
                const product = products[productFromBascet.id];
                product.count = productFromBascet.count;

                bascet.add(product);
            });
        }

        return bascet;
    }

    saveBascet(bascet) {
        sessionStorage.setItem(BASCET, JSON.stringify(bascet));
    }
    
}