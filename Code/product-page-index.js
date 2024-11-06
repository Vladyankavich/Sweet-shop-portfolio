window.addEventListener("DOMContentLoaded", () => {
    const productPageManager = new ProductPageManager();
    const productJSON = sessionStorage.getItem(SELECTED_PRODUCT);
    const product = new Product();
    product.parseJSON(JSON.parse(productJSON));
    console.log(product);
    
    const mainProductPage = document.querySelector(".main_product-page");

    mainProductPage.append(productPageManager.createProductPageHTML(product))
})