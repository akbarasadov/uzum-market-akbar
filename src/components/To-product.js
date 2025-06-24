export function Toproduct(item) {
    let body = document.createElement("div")
    body.classList.add("body")

    let price = item.price.toLocaleString()
    let sale = item.price
    let gar = ""
    let sale_price = ""
    let prices = ""

    if (item.salePercentage != 0) {
        sale = Math.floor(item.price + ((item.price / 100) * item.salePercentage)).toLocaleString()
        gar = "gar"
        sale_price = "sale_price"
        prices = "prices"
    } else {
        sale_price = "to_sale_text"
        gar = "to_gar_text"
        sale = "Гарантия низкой цены"
        prices = "none"
    }


    body.innerHTML = `
                        <div class="left">
                            <div class="all">
                                <img src="${item.media[0]}" alt="">
                                <img src="${item.media[0]}" alt="">
                                <img src="${item.media[0]}" alt="">
                                <img src="${item.media[0]}" alt="">
                            </div>
                            <div class="bg">
                                <img src="${item.media[0]}" alt="">
                            </div>
                        </div>

                        <div class="right">
                            <h1>${item.title}</h1>
                            <div class="${prices}">
                                <p class="to_sale_price ${sale_price}">${price} сум</p>
                                <p class="to_price ${gar}">${sale}</p>
                            </div>
                            <div class="pices">
                                <button class="minus btnsab">-</button>
                                <p class="text">1</p>
                                <button class="plus btnsab">+</button>
                            </div>
                            <div class="line"></div>
                            <p class="description">${item.description}</p>
                            <div class="btns">
                                <button class="btn1 btnsab">Добавить в корзину</button>
                                <button class="btn2 btnsab">Добавить в избранное</button>
                        </div>
            </div>
        </div>
    `

    return body
}