export function Basket(item) {
    let product = document.createElement("div");
    product.classList.add("product");

    product.setAttribute("data-sale", item.salePercentage || 0);

    product.innerHTML = `
        <img class="bg-image" src="${item.media[0]}" alt="">
        <div class="right">
            <p class="product_name">${item.title}</p>
            <p class="price number">${item.price}</p>
            <div class="pices">
                <button class="minus">-</button>
                <p class="text">1</p>
                <button class="plus">+</button>
            </div>
            <button class="delete">Удалить</button>
        </div>
    `;

    return product;
}