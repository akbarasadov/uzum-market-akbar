import { Categories } from "../../src/components/Categories"
import { Favorites } from "../../src/components/Favorites"
import { reload } from "../../src/utils/reload"


let to_chosen = document.querySelector(".to_chosen")

// let name = localStorage.getItem("usersname")
// let password = localStorage.getItem("userspassword")


let categ = document.querySelector(".categ")

let res1 = await fetch("http://localhost:8080/categories")
let categoryData = await res1.json()


reload(categoryData, Categories, categ)

// if (name || password) {
//     if (product.length === 0) {

//         to_chosen.classList.add("chosen_null")

//         to_chosen.innerHTML = `
//         <img src="/public/hearts 1.png" alt="">
//         <h1 class="chosen_null_h1">Добавьте то, что понравилось</h1>
//         <p class="chosen_null_p">Перейдите на главную страницу и нажмите на ♡ в товаре</p>
//         <p class="chosen_null_p">На главную</p>
//         `
//     }
// } else {
// }





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


// let saved = JSON.parse(localStorage.getItem("favorites_product_name")) || [];

// let grid = document.querySelector(".grid")

// console.log(saved[0]);


// let res = await fetch(`http://localhost:8080/products?title=${saved}`);
// let products = await res.json();


// reload(products, Basket, grid)

let saved = JSON.parse(localStorage.getItem("favorites_product_name")) || [];
let grid = document.querySelector(".grid");


let all = [];

for (let title of saved) {
    let res = await fetch(`http://localhost:8080/products?title=${encodeURIComponent(title)}`);
    let products = await res.json();
    all.push(...products);
}
grid.innerHTML = ""

reload(all, Favorites, grid);


function attachFavoriteEvents() {
    let allproducts = document.querySelectorAll(".product");

    allproducts.forEach(product => {
        let favoritesBtn = product.querySelector(".favorites");
        let favoritesImg = product.querySelector(".favorites img");
        let text = product.querySelector(".a");
        let title = text.textContent.trim();

        favoritesBtn.onclick = (e) => {
            e.stopPropagation();
            product.remove();

            let saved = JSON.parse(localStorage.getItem("favorites_product_name")) || [];

            if (favoritesBtn.classList.contains("noselect")) {
                favoritesBtn.classList.remove("noselect");
                favoritesBtn.classList.add("select");
                favoritesImg.src = "/public/Vector (1).png";

                if (!saved.includes(title)) {
                    saved.push(title);
                }

                localStorage.setItem("favorites_product_name", JSON.stringify(saved));
            } else {
                favoritesBtn.classList.remove("select");
                favoritesBtn.classList.add("noselect");
                favoritesImg.src = "/public/Vector.png";

                saved = saved.filter(t => t !== title);
                localStorage.setItem("favorites_product_name", JSON.stringify(saved));

                reload(all, Favorites, grid);

            }
        };
    });
}


let product = document.querySelectorAll(".grid .product")

if (product.length === 0) {

    to_chosen.classList.add("chosen_null")

    to_chosen.innerHTML = `
        <img src="/public/hearts 1.png" alt="">
        <h1 class="chosen_null_h1">Добавьте то, что понравилось</h1>
        <p class="chosen_null_p">Нажмите на ♡ в товаре. Войдите в аккаунт и всё избранное сохранится</p>
        <button class="signbtn">Войти в аккаунт</button>
    `
} else {
    setTimeout(() => {
        attachFavoriteEvents();
    }, 10);
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