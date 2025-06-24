import { Categories } from "../../src/components/Categories.js";
import { Products } from "../../src/components/Product.js";
import { reload } from "../../src/utils/reload.js";

let id = localStorage.getItem("categoryID")

let res = await fetch(`http://localhost:8080/categories?id=${id}`);
let categ = await res.json();

console.log(categ[0].type);


let res1 = await fetch(`http://localhost:8080/products?type=${categ[0].type}`);
let products = await res1.json();

let productPlace = document.querySelector(".grid");
let h1 = document.querySelector("h1");

h1.textContent = categ[0].title

reload(products, Products, productPlace);



let categ1 = document.querySelector(".categ")

let res2 = await fetch("http://localhost:8080/categories")
let categoryData = await res2.json()


reload(categoryData, Categories, categ1)

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


let allproducts = document.querySelectorAll(".product")

allproducts.forEach(product => {
    let btn = product.querySelector(".favorites")
    let favoritesImg = btn.querySelector("img")

    btn.onclick = () => {
        if (btn.classList.contains("noselect")) {
            favoritesImg.src = "/public/Vector (1).png"
            btn.classList.remove("noselect")
            btn.classList.add("select")
        } else {
            favoritesImg.src = "/public/Vector.png"
            btn.classList.remove("select")
            btn.classList.add("noselect")
        }
    }
})


let searchInput = document.querySelector(".input_search");


let clear = document.querySelector(".clear")
let all_searches = document.querySelector(".recent-searches")
let search_container = document.querySelector(".search-container")
let searched = document.querySelector(".searched")
let background = document.querySelector(".background")


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
            console.log(item.name);

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


allproducts.forEach(product => {
    let button = product.querySelector(".button");
    let text = product.querySelector(".a");

    button.onclick = (e) => {
        e.stopPropagation();

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

        window.location.href = "/pages/basket/index.html";
    };
});


let sign_text = document.querySelector(".sign-in p")
let sign = document.querySelector(".sign-in")

let password = localStorage.getItem("userspassword")
let email = localStorage.getItem("usersemail")

let res3 = await fetch(`http://localhost:8080/users?email=${email}&password=${password}`);
let users = await res3.json()

if (password || email) {
    sign_text.textContent = users[0].name
    sign.setAttribute("href", "")
} else {
    sign_text.textContent = "Войти"
    sign.setAttribute("href", "/pages/sign-in/index.html")
}