// export function Toproduct(item) {
//     let body = document.createElement("div")
//     body.classList.add("body")

//     let price = item.price.toLocaleString()
//     let sale = item.price
//     let gar = ""
//     let sale_price = ""
//     let prices = ""

//     if (item.salePercentage != 0) {
//         sale = Math.floor(item.price + ((item.price / 100) * item.salePercentage)).toLocaleString()
//         gar = "gar"
//         sale_price = "sale_price"
//         prices = "prices"
//     } else {
//         sale_price = "to_sale_text"
//         gar = "to_gar_text"
//         sale = "Гарантия низкой цены"
//         prices = "none"
//     }

//     console.log(item.media.length);


//     body.innerHTML = `
//                         <div class="left">
//                             <div class="all">
//                                 <img src="${item.media[0]}" alt="">
//                                 <img src="${item.media[item.media.length - 1]}" alt="">
//                                 <img src="${item.media[item.media.length - 2]}" alt="">
//                                 <img src="${item.media[item.media.length - 3]}" alt="">
//                             </div>
//                             <div class="bg">
//                                 <img src="${item.media[0]}" alt="">
//                             </div>
//                         </div>

//                         <div class="right">
//                             <h1>${item.title}</h1>
//                             <div class="${prices}">
//                                 <p class="to_sale_price ${sale_price}">${price} сум</p>
//                                 <p class="to_price ${gar}">${sale}</p>
//                             </div>
//                             <div class="pices">
//                                 <button class="minus btnsab">-</button>
//                                 <p class="text">1</p>
//                                 <button class="plus btnsab">+</button>
//                             </div>
//                             <div class="line"></div>
//                             <p class="description">${item.description}</p>
//                             <div class="btns">
//                                 <button class="btn1 btnsab">Добавить в корзину</button>
//                                 <button class="btn2 btnsab">Добавить в избранное</button>
//                         </div>
//             </div>
//         </div>
//     `

//     return body
// }


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


    const len = item.media.length;


    const picks = [
        0,
        Math.max(len - 1, 0),
        Math.max(len - 2, 0),
        Math.max(len - 3, 0),
    ];

    const fourSrcs = picks.map(i => item.media[i]);

    const allImagesHtml = fourSrcs
        .map(src => `<img class="img_products ${len}" src="${src}" alt="">`)
        .join("");

    body.innerHTML = `
            <div class="left">
                <div class="all">
                ${allImagesHtml}
                </div>
                <div class="bg">
                    <img class="product_bg_img" src="${item.media[0]}" alt="">
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
    `;


    return body
}