export class ProductSearch {
    
    subscribeToInput(callback){
        const search = document.querySelector(".search");

        search.addEventListener("input", (state) => {
            callback(state.target.value);            
        })
    }
}