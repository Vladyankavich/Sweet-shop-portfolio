class ProductPageManager {
    // Створюємо картку продукту
    createProductPageHTML (product) {
        const productPage = document.createElement("div");
        productPage.classList.add("product-page");

        const sectionImage = document.createElement("section");
        sectionImage.classList.add("section-image");
        sectionImage.innerHTML = `<img src=".${product.image}" alt="${product.name}">`;

        const sectionInformation = document.createElement("section");
        sectionInformation.classList.add("section-information");
        
        const productName = document.createElement("div");
        productName.classList.add("product-name");
        productName.innerHTML = `${product.name}`;
        
        const productPrice = document.createElement("div");
        productPrice.classList.add("product-price");
        productPrice.innerHTML = `${product.price} грн`;

        const productGroup = document.createElement("div");
        productGroup.classList.add("product-group");

        const productCount = document.createElement("div");
        productCount.classList.add("product-count");

        const productBtnMinus = document.createElement("button");
        productBtnMinus.classList.add("product_btn_minus");
        productBtnMinus.innerHTML = `-`;

        const productsCount = document.createElement("div");
        productsCount.classList.add("products_count");
        productsCount.innerHTML = `1`;

        const productBtnPlus = document.createElement("button");
        productBtnPlus.classList.add("product_btn_plus");
        productBtnPlus.innerHTML = `+`;

        productCount.append(productBtnMinus, productsCount, productBtnPlus);

        const productButton = document.createElement("div");
        productButton.classList.add("product_button");
        productButton.innerHTML = `Купити`;

        productGroup.append(productCount, productButton);

        const productDescription = document.createElement("div");
        productDescription.classList.add("product-description");
        productDescription.innerHTML = `<span>Опис: </span>${product.description}`;

        sectionInformation.append(productName, productPrice, productGroup, productDescription);

        productPage.append(sectionImage, sectionInformation);

        return productPage;
    }
}