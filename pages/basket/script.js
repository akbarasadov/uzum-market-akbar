let productsContainer = document.querySelector(".products_basket");
let basket = document.querySelector(".to_basket");
let total = document.querySelector(".total");
let total_price = document.querySelector(".total_price");
let total_sale = document.querySelector(".total_sale")

import { Basket } from "../../src/components/Basket";
import { Categories } from "../../src/components/Categories";
import { reload } from "../../src/utils/reload";


let titles = [];
try {
    titles = JSON.parse(localStorage.getItem("basket_product_name")) || [];
} catch {
    titles = [];
}


let res = await fetch("http://localhost:8080/products");
let product = await res.json();


let matchedProducts = product.filter(p => titles.includes(p.title));

reload(matchedProducts, Basket, productsContainer);

let categ = document.querySelector(".categ")

let res1 = await fetch("http://localhost:8080/categories")
let categoryData = await res1.json()


reload(categoryData, Categories, categ)


const updateTotalItemCount = () => {
    const updatedProducts = productsContainer.querySelectorAll(".product");
    total.textContent = `Итого товаров: ${updatedProducts.length}`;
};

const updateTotalPrice = () => {
    let totalSum = 0;
    const updatedProducts = productsContainer.querySelectorAll(".product");

    updatedProducts.forEach(product => {
        let priceText = product.querySelector(".price").textContent;
        let price = parseInt(priceText.replace(/\D/g, ''));
        totalSum += price;
    });

    total_price.textContent = `${totalSum.toLocaleString()} сум`;
};


// const updateTotalSale = () => {
//     let totalSale = 0;
//     const updatedProducts = productsContainer.querySelectorAll(".product");

//     updatedProducts.forEach(product => {
//         let priceText = product.querySelector(".price").textContent;
//         let price = parseInt(priceText.replace(/\D/g, ''));
//         let sale = (price / 100) * product.salePercentage
//         totalSale += sale;
//     });

//     total_sale.textContent = `${totalSale.toLocaleString()} сум`;
// };

const updateTotalSale = () => {
    let totalSale = 0;
    const updatedProducts = productsContainer.querySelectorAll(".product");

    updatedProducts.forEach(product => {
        let priceText = product.querySelector(".price").textContent;
        let price = parseInt(priceText.replace(/\D/g, ''));

        let salePercent = parseInt(product.getAttribute("data-sale")) || 0;

        let sale = (price / 100) * salePercent;
        totalSale += sale;
    });

    total_sale.textContent = `Итого скидки: ${totalSale.toLocaleString('ru-RU')} сум`;
};



const showEmptyBasket = () => {
    basket.innerHTML = `
        <img src="/public/shopocat 1 (1).png" alt="">
        <h2 class="basket_null_h2">В корзине пока нет товаров</h2>
        <p>Начните с подборок на главной странице или найдите нужный товар через поиск</p>
    `;
    basket.classList.add("basket_null");
};

const setupProductEvents = (product) => {
    let minus = product.querySelector(".minus");
    let plus = product.querySelector(".plus");
    let pices_text = product.querySelector(".text");
    let product_price = product.querySelector(".price");
    let remove = product.querySelector(".delete");

    let basePrice = parseInt(product_price.textContent.replace(/\D/g, ''));

    const updatePrice = () => {
        let count = parseInt(pices_text.textContent);
        let totalPrice = basePrice * count;
        product_price.textContent = `${totalPrice.toLocaleString()} сум`;
        updateTotalPrice();
        updateTotalSale()
    };

    minus.onclick = () => {
        let count = parseInt(pices_text.textContent);
        if (count > 1) {
            count--;
            pices_text.textContent = count;
            updatePrice();
        }
    };

    plus.onclick = () => {
        let count = parseInt(pices_text.textContent);
        count++;
        pices_text.textContent = count;
        updatePrice();
    };


    updatePrice();
};

let products_basket = document.querySelectorAll(".product")

products_basket.forEach(product => {

    let remove = product.querySelector(".delete")

    remove.onclick = () => {

        product.remove();
        updateTotalPrice();
        updateTotalSale();
        updateTotalItemCount();

        let nameToRemove = product.querySelector(".product_name").textContent.trim();

        let data = localStorage.getItem("basket_product_name");
        if (data) {
            let parsed = JSON.parse(data);
            let updated = parsed.filter(item => item !== nameToRemove);
            console.log(parsed);

            localStorage.setItem("basket_product_name", JSON.stringify(updated));

            if (updated.length === 0) {
                document.querySelector(".search-dropdown").innerHTML = "";
                searchInput.classList.remove("click");
            }
        }

        if (productsContainer.querySelectorAll(".product").length === 0) {
            showEmptyBasket();
        }
    };
})

// let products_basket = document.querySelectorAll(".product");

// products_basket.forEach(product => {
//     let remove = product.querySelector(".delete");

//     remove.onclick = () => {
//         product.remove();
//         updateTotalPrice();
//         updateTotalSale();
//         updateTotalItemCount();

//         // Bu yerda nom olinayapti, shuni nom bilan solishtirish kerak
//         let nameToRemove = product.querySelector(".product_name").textContent.trim();
//         console.log("Remove:", nameToRemove);

//         let data = localStorage.getItem("basket_product_name");
//         if (data) {
//             let parsed = JSON.parse(data);

//             // ❗️title bilan solishtirish
//             let updated = parsed.filter(item => item !== nameToRemove);

//             localStorage.setItem("basket_product_name", JSON.stringify(updated));

//             if (updated.length === 0) {
//                 document.querySelector(".search-dropdown").innerHTML = "";
//                 searchInput.classList.remove("click");
//             }
//         }

//         if (productsContainer.querySelectorAll(".product").length === 0) {
//             showEmptyBasket();
//         }
//     };
// });


let products = productsContainer.querySelectorAll(".product");

if (products.length === 0) {
    showEmptyBasket();
} else {
    products.forEach(setupProductEvents);
    updateTotalItemCount();
    updateTotalPrice();
    updateTotalSale()
}



let stored = JSON.parse(localStorage.getItem("myProducts")) || [];

let searchInput = document.querySelector(".input_search");

let newProduct = { name: searchInput.value.trim() };

if (newProduct.name !== "") {
    stored.push(newProduct);
    localStorage.setItem("myProducts", JSON.stringify(stored));
}

let data = localStorage.getItem("myProducts");

if (data) {
    let parsedProducts = JSON.parse(data);
    let place = document.querySelector(".recent-searches");
    place.innerHTML = "";

    let uniqueByName = [];
    let seen = new Set();

    for (let item of parsedProducts.reverse()) {
        if (!seen.has(item.name)) {

            seen.add(item.name);
            uniqueByName.push(item);
        }
    }

    for (const searchedname of uniqueByName) {
        let div = document.createElement("div");
        div.classList.add("searched_block");

        div.innerHTML = `
            <div class="left_li">
                <img src="https://marketplace.canva.com/Njmq0/MADBWZNjmq0/2/tl/canva-time-icon-MADBWZNjmq0.png" alt="">
                <p>${searchedname.name}</p>
            </div>
            <span class="remove">✖</span>
        `;

        place.appendChild(div);
    }
}




// products_basket.forEach(block => {
//     console.log(block);

//     let nameToRemove = block.querySelector(".product_name").textContent.trim();
//     let remove = block.querySelector(".delete")
//     remove.onclick = () => {
//         block.remove()
//         let data = localStorage.getItem("basket_product_name");
//         if (data) {
//             let parsed = JSON.parse(data);
//             let updated = parsed.filter(item => {
//                 item.name !== nameToRemove
//             })


//             localStorage.setItem("basket_product_name", JSON.stringify(updated));
//         }
//     }
// })


let resultsContainer = document.querySelector(".recent-searches");

searchInput.oninput = () => {
    let searchText = searchInput.value.toLowerCase().trim();

    let filteredProducts = products.filter(product => {
        return (
            product.title.toLowerCase().includes(searchText) ||
            product.type.toLowerCase().includes(searchText) ||
            product.categ.toLowerCase().includes(searchText)
        );
    })

    if (searchText === "") {
        resultsContainer.innerHTML = "";
        return;
    }

    resultsContainer.innerHTML = "";

    if (filteredProducts.length === 0) {
        resultsContainer.innerHTML = "<p>Hech narsa topilmadi</p>";
        return;
    }

    filteredProducts.forEach(product => {
        let div = document.createElement("div");
        div.classList.add("searched_block");

        div.innerHTML = `
            <div class="left_li">
                <img src="https://marketplace.canva.com/Njmq0/MADBWZNjmq0/2/tl/canva-time-icon-MADBWZNjmq0.png" alt="">
                <p>${product.categ}</p>
            </div>
            <span class="remove">✖</span>
        `;

        resultsContainer.append(div);
    });
};


let clear = document.querySelector(".clear");
let all_searches = document.querySelector(".recent-searches");
let searched = document.querySelector(".searched");
let background = document.querySelector(".background");
let search_container = document.querySelector(".search_container")
let all_search = document.querySelector(".all_search")
let header = document.querySelector(".header")
let search_dropdown = document.querySelector(".search-dropdown")


searchInput.onclick = () => {
    searchInput.classList.add("click");
    search_container.classList.add("click");
    searched.classList.add("click");
    header.classList.add("click");
    background.classList.add("click");
    all_search.classList.add("click");
    search_dropdown.classList.add("click");
};

background.onclick = () => {
    searchInput.classList.remove("click");
    search_container.classList.remove("click");
    searched.classList.remove("click");
    header.classList.remove("click");
    all_search.classList.remove("click")
    background.classList.remove("click");
    search_dropdown.classList.remove("click");
};

searchInput.onsearch = () => {
    localStorage.setItem("search", searchInput.value);
    window.location.href = "/pages/search/index.html";
};


const catalogBtn = document.querySelector('.catalog_btn');
const catalog = document.querySelector('.catalog');
const overlay = document.querySelector('.bottom');

catalogBtn.onclick = () => {
    catalog.classList.toggle("active");
    header.classList.toggle("active");
    overlay.style.display = catalog.classList.contains('active') ? 'block' : 'none';
};

overlay.onclick = () => {
    catalog.classList.remove("active");
    header.classList.remove("active");
    overlay.style.display = 'none';
}


let sign_text = document.querySelector(".sign-in p")
let sign = document.querySelector(".sign-in")

let password = localStorage.getItem("userspassword")
let email = localStorage.getItem("usersemail")

let res2 = await fetch(`http://localhost:8080/users?email=${email}&password=${password}`);
let users = await res2.json()

if (password || email) {
    sign_text.textContent = users[0].name
    sign.setAttribute("href", "")
} else {
    sign_text.textContent = "Войти"
    sign.setAttribute("href", "/pages/sign-in/index.html")
}

// let pices = localStorage.getItem("basket_pices")


// let lastProduct = products[products.length - 1];

// let pices_text = lastProduct.querySelector(".text")

// pices_text.textContent = pices


// const pices = localStorage.getItem("basket_pices");
// let myArray = [];
// if (pices) {
//     try {
//         myArray = JSON.parse(pices);
//     } catch (e) {
//         console.error("JSON parsing error:", e);
//     }
// }

// let allproducts = document.querySelectorAll(".product");

// allproducts.forEach(product => {
//     let product_name = product.querySelector(".product_name")
//     let pices = product.querySelector(".text")

//     myArray.forEach(my => {
//         console.log();
//         if (product_name.textContent === my.name) {
//             pices.textContent = my.pices
//         }
//     })
// })

document.addEventListener("DOMContentLoaded", () => {
  const raw = localStorage.getItem("basket_pices");
  let basketArr = raw ? JSON.parse(raw) : [];

  document.querySelectorAll(".product").forEach(prod => {
    const name = prod.querySelector(".product_name")?.textContent?.trim();
    const countEl = prod.querySelector(".text");
    const found = basketArr.find(item => item.name.trim() === name);
    if (found) {
      countEl.textContent = found.pices;
    }
  });
});