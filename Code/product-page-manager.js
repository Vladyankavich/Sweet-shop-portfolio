import { ProductPage } from "./product-page.js";

export class ProductPageManager {
    // Ствproduct-pageорюємо картку продукту
    createProductPageHTML (product) {
        const productPage = document.createElement("div");
        productPage.classList.add("product_page");

        const sectionImage = document.createElement("section");
        sectionImage.classList.add("section_image");
        sectionImage.innerHTML = `<img src=".${product.image}" alt="${product.name}">`;

        const sectionInformation = document.createElement("section");
        sectionInformation.classList.add("section_information");

        const productName = document.createElement("div");
        productName.classList.add("product_name");
        productName.innerHTML = `${product.name}`;

        const productPrice = document.createElement("div");
        productPrice.classList.add("product_price");
        productPrice.innerHTML = `${product.price} грн`;

        const productGroup = document.createElement("div");
        productGroup.classList.add("product_group");

        const productCount = document.createElement("div");
        productCount.classList.add("product_count");

        const productBtnMinus = document.createElement("button");
        productBtnMinus.classList.add("product_btn_minus");
        productBtnMinus.innerHTML = `-`;

        const productsCount = document.createElement("div");
        productsCount.classList.add("products_count");
        productsCount.innerHTML = `${product.count}`;

        const productBtnPlus = document.createElement("button");
        productBtnPlus.classList.add("product_btn_plus");
        productBtnPlus.innerHTML = `+`;

        productCount.append(productBtnMinus, productsCount, productBtnPlus);

        const productButton = document.createElement("div");
        productButton.classList.add("product_button");
        productButton.innerHTML = `Купити`;

        productGroup.append(productCount, productButton);

        const productDescription = document.createElement("div");
        productDescription.classList.add("product_description");
        productDescription.innerHTML = `<span>Опис: </span>${product.description}`;

        sectionInformation.append(productName, productPrice, productGroup, productDescription);

        productPage.append(sectionImage, sectionInformation);

        return productPage;
    }

    updateProductPageHTML(product, productPage, inBascet) {
        const productsCountText = productPage.codeHTML.querySelector(".products_count");
        const productBuyButton = productPage.codeHTML.querySelector(".product_button");        
        const productPriceText = productPage.codeHTML.querySelector(".product_price");
    
        if (inBascet) {
            productBuyButton.innerText = "У кошику";
            productBuyButton.style.backgroundColor = "white";
            productBuyButton.style.color = "#78181f";
        }
        else{
            productBuyButton.innerText = "Купити";
        }
    
        productsCountText.innerText = `${product.count}`;
        productPriceText.innerText = `${product.price} грн`;
    }

    createProductPage(product) {
        const productPage = new ProductPage(product.id, product.category, this.createProductPageHTML(product));

        return productPage;
    }
}