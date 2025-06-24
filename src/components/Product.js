export function Products(item) {
    let products = document.createElement("div")
    products.classList.add("product")

    let gar_text = ""
    let gar = "gar"
    let g1 = ""
    let g2 = ""
    let price = item.price.toLocaleString('ru-RU')
    let sale = item.price
    let for_month = item.price

    if (item.salePercentage) {
        sale = Math.floor(item.price + ((item.price / 100) * item.salePercentage))
        for_month = Math.floor(sale / 12).toLocaleString('ru-RU')
        gar = "gar"
    } else {
        for_month = Math.floor(item.price / 12).toLocaleString('ru-RU')
        sale = "Гарантия низкой цены"
        gar = "to_gar"
        gar_text = "to_gar_text"
        g1 = "g1"
        g2 = "g2"
    }


    products.innerHTML = `
    <div class="image-wrapper">
        <div class="img_container">
            <img class="bg-image" src="${item.media[0]}" alt="">
        </div>
        <button class="logo-image noselect product-card-like favorites" title="Добавить ${item.title} в избранное">
            <img src="/public/Vector.png" alt=""></img>
        </button>
    </div>
    <div class="data">
        <p class="a_title_a">${item.title}</p>
        <div class="raiting">
            <svg data-v-5a662906="" width="14" height="14" viewBox="0 0 18 18" fill="none"
                xmlns="http://www.w3.org/2000/svg" data-test-id="icon__rating-star"
                class="ui-icon  rating-icon">
                <path
                d="M9 12.9525L13.635 15.75L12.405 10.4775L16.5 6.93L11.1075 6.4725L9 1.5L6.8925 6.4725L1.5 6.93L5.595 10.4775L4.365 15.75L9 12.9525Z"
                fill="#F5A623"></path>
            </svg>
        <p>${item.rating} (${Math.floor(Math.random() * 10000).toLocaleString('ru-RU')} отзыв)</p>
    </div>

    <div class="sale">
                <p class="number">${for_month} сум/мес</p>
                </div>
                <div class="b">
                <div class="left">
                    <p class="number ${gar} ${gar_text} ${g1}">${sale.toLocaleString('ru-RU')}</p>
                    <p class="number price ${gar_text} ${g2}">${price}</p>
                </div>
                <div class="right">
                <button class="button" data-v-10380025="" data-v-5a662906=""
                    title="Добавить ${item.title} в корзину"
                    data-test-id="button__add-to-cart"
                    class="ui-component ui-button add-to-cart tertiary-outlined small fill"><!---->
                    <div data-v-10380025="" class="slot default"><svg data-v-5a662906="" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="ui-icon  add-cart-icon">
                    <path
                        d="M8 10V8H6V12.5C6 12.7761 5.77614 13 5.5 13C5.22386 13 5 12.7761 5 12.5V7H8C8 4.59628 9.95227 3 12 3C14.0575 3 16 4.70556 16 7H19V19.5C19 20.3284 18.3284 21 17.5 21H12.5C12.2239 21 12 20.7761 12 20.5C12 20.2239 12.2239 20 12.5 20H17.5C17.7761 20 18 19.7761 18 19.5V8H16V10H15V8H9V10H8ZM12 4C10.4477 4 9 5.20372 9 7H15C15 5.29444 13.5425 4 12 4Z"
                        fill="black"></path>
                    <path
                        d="M7.5 14C7.77614 14 8 14.2239 8 14.5V17H10.5C10.7761 17 11 17.2239 11 17.5C11 17.7761 10.7761 18 10.5 18H8V20.5C8 20.7761 7.77614 21 7.5 21C7.22386 21 7 20.7761 7 20.5V18H4.5C4.22386 18 4 17.7761 4 17.5C4 17.2239 4.22386 17 4.5 17H7V14.5C7 14.2239 7.22386 14 7.5 14Z"
                        fill="black"></path>
                    </svg></div> <!---->
                </button>
                </div>
        </div>
    `

    products.onclick = () => {
        window.location.href = "/pages/product/"
        localStorage.setItem("to-product", item.id)
    }


    return products
}