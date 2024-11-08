class Product {
    constructor(id, name, price, image, description, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.category = category;
        this.count = 1;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name, 
            price: this.price, 
            image: this.image, 
            description: this.description,
            category: this.category,
            count: this.count
        };
    }

    parseJSON(json){
        this.id = json.id;
        this.name = json.name;
        this.price = json.price;
        this.image = json.image;
        this.description = json.description;
        this.category = json.category;
        this.count = json.count;
    }

    totalPrice() {
        return (this.price * this.count);
    }
}