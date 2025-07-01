import { Categories } from "../../src/components/Categories";
import { Toproduct } from "../../src/components/To-product";
import { reload } from "../../src/utils/reload";
import { Products } from "/src/components/product"

let grid = document.querySelector(".to_product")

let res = await fetch("http://localhost:8080/products");
let products = await res.json();

let storage = localStorage.getItem("to-product")


grid.append(Toproduct(products[storage - 1]))


let productPlace = document.querySelector(".grid");
reload(products, Products, productPlace);



let categ = document.querySelector(".categ")

let res1 = await fetch("http://localhost:8080/categories")
let categoryData = await res1.json()


reload(categoryData, Categories, categ)

// const updateTotalPrice = () => {
//     let totalSum = 0;

//     products.forEach(product => {
//         console.log(product);

//         let priceOne = product.querySelector(".sale_price")
//         let priceText = priceOne.textContent;
//         let price = parseInt(priceText.replace(/\D/g, ''));
//         totalSum += price;
//     });

//     total_price.textContent = `${totalSum.toLocaleString()} сум`;
// };


let plus = document.querySelector(".plus")
let minus = document.querySelector(".minus")
let pices_text = document.querySelector(".text")
let product_price = document.querySelector(".to_sale_price");
let product_sale_price = document.querySelector(".to_price");

let basePrice = parseInt(product_price.textContent.replace(/\D/g, ''));

const updatePrice = () => {
    let count = parseInt(pices_text.textContent);
    let totalPrice = basePrice * count;

    let app = products[storage - 1]

    let totalSalePrice = Math.floor(basePrice + ((basePrice / 100) * app.salePercentage)) * count


    product_price.textContent = `${totalPrice.toLocaleString()} сум`;
    if (app.salePercentage !== 0) {
        product_sale_price.textContent = `${totalSalePrice.toLocaleString()}`;
    }
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

const catalogBtn = document.querySelector('.catalog_btn');
const catalog = document.querySelector('.catalog');
const overlay = document.querySelector('.bottom');
const header = document.querySelector(".header");

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


let clear = document.querySelector(".clear")
let all_searches = document.querySelector(".recent-searches")
let search_container = document.querySelector(".search-container")
let searched = document.querySelector(".searched")
let background = document.querySelector(".background")
let searchInput = document.querySelector(".input_search")


clear.onclick = () => {
    search_container.textContent = ""
    searchInput.classList.remove("click")
}

searchInput.onclick = () => {
    searchInput.classList.add("click")
    search_container.classList.add("click")
    searched.classList.add("click")
    header.classList.add("click")
    background.classList.add("click")
}

background.onclick = () => {
    searchInput.classList.remove("click")
    search_container.classList.remove("click")
    searched.classList.remove("click")
    header.classList.remove("click")
    background.classList.remove("click")
}

searchInput.onsearch = () => {
    localStorage.setItem("search", searchInput.value)
    window.location.href = "/pages/search/index.html"
}


clear.onclick = () => {
    localStorage.removeItem("myProducts");
};

let stored = JSON.parse(localStorage.getItem("myProducts")) || [];

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

let searched_block = document.querySelectorAll(".searched_block")

searched_block.forEach(block => {
    let remove = block.querySelector(".remove")
    remove.onclick = () => {
        block.remove()
        let data = localStorage.getItem("myProducts");
        if (data) {
            let parsed = JSON.parse(data);
            let updated = parsed.filter(item => item.name !== nameToRemove);
            localStorage.setItem("myProducts", JSON.stringify(updated));

            if (updated.length === 0) {
                document.querySelector(".search-dropdown").innerHTML = "";
                searchInput.classList.remove("click");
            }
        }
    }

    block.onclick = () => {
        let text = block.querySelector("p")
        window.location.href = "/pages/search/index.html"
        localStorage.setItem("search", text.textContent)
    }
})


let button = document.querySelector(".btn1");
let text = document.querySelector(".to_product h1");

button.onclick = () => {
    let title = text.textContent;

    let saved = [];
    try {
        saved = JSON.parse(localStorage.getItem("basket_product_name")) || [];
    } catch {
        saved = [];
    }

    if (!saved.includes(title)) {
        saved.push(title);
    }

    localStorage.setItem("basket_product_name", JSON.stringify(saved));


    const product = {
        name: pices_text.textContent,
        pices: text.textContent
    };



    const basket = JSON.parse(localStorage.getItem("basket_pices")) || [];

    basket.push(product);

    localStorage.setItem("basket_pices", JSON.stringify(basket));


    window.location.href = "/pages/basket/index.html";
};

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


let img_products = document.querySelectorAll(".img_products")
let product_bg_img = document.querySelector(".product_bg_img")

if (img_products.length > 0) {
    const firstImg = img_products[0];
    firstImg.classList.add("active_img");
    product_bg_img.setAttribute("src", firstImg.getAttribute("src"));
}

img_products.forEach(img => {
    img.onclick = () => {
        let src = img.getAttribute("src")
        product_bg_img.setAttribute("src", src)

        img_products.forEach(product_img => {
            product_img.classList.remove("active_img")
        })
        img.classList.add("active_img")
    }
})