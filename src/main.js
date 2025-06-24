import { reload } from "./utils/reload.js";
import { Slide } from './components/Slide.js';
import { Products } from "./components/Product.js";
import { Categories } from "./components/Categories.js";

let slides = await fetch("http://localhost:8080/slides");
let slidesData = await slides.json();

const swiperWrapper = document.querySelector(".swiper-wrapper")

reload(slidesData, Slide, swiperWrapper)


let res = await fetch("http://localhost:8080/products");
let products = await res.json();

let productPlace = document.querySelector(".grid");

reload(products, Products, productPlace);

let resp = await fetch("http://localhost:8080/products");
let popularproduct = await resp.json();

const popular = popularproduct.filter((product) => product.rating >= 5);

let productPlace1 = document.querySelector(".grid1");

reload(popular, Products, productPlace1);

let categ = document.querySelector(".categ")

let res1 = await fetch("http://localhost:8080/categories")
let categoryData = await res1.json()


reload(categoryData, Categories, categ)

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

let plrs = document.querySelectorAll(".plr")


plrs.forEach(plr => {
    let places = plr.querySelector(".place8")
    let see_all = plr.querySelector(".see_all")

    see_all.onclick = () => {
        places.classList.remove("place8")
        see_all.remove()
    }
})



let popular_products = document.querySelector(".popular_products")
let uzum_products = document.querySelector(".uzum_product")

popular_products.onclick = () => {
    localStorage.setItem("type_products", "popular_products")
    window.location.href = "/pages/categ/index.html"
}

uzum_products.onclick = () => {
    localStorage.setItem("type_products", "uzum_products")
    window.location.href = "/pages/categ/index.html"
}


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
    let nameToRemove = block.querySelector("p").textContent.trim();
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
    let text = product.querySelector(".a_title_a");

    button.onclick = (e) => {
        e.stopPropagation();

        localStorage.setItem("basket_pices", 1)

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




// allproducts.forEach(product => {

//     let favoritesBtn = product.querySelector(".favorites");
//     let favoritesImg = product.querySelector(".favorites img");
//     let text = product.querySelector(".a");

//     favoritesBtn.onclick = (e) => {
//         e.stopPropagation();


//         if (favoritesBtn.classList.contains("noselect")) {
//             favoritesImg.src = "/public/Vector (1).png"

//             favoritesBtn.classList.remove("noselect")
//             favoritesBtn.classList.add("select")

//             let saved = [];
//             try {
//                 saved = JSON.parse(localStorage.getItem("favorites_product_name")) || [];
//             } catch {
//                 saved = [];
//             }

//             if (!saved.includes(title)) {
//                 saved.push(title);
//             }

//             let title = text.textContent;

//             localStorage.setItem("basket_product_name", JSON.stringify(saved));
//         } else {
//             favoritesImg.src = "/public/Vector.png"

//             favoritesBtn.classList.add("noselect")
//             favoritesBtn.classList.remove("select")

//             let title = text.textContent;

//             let saved = [];
//             try {
//                 saved = JSON.parse(localStorage.getItem("favorites_product_name")) || [];
//             } catch {
//                 saved = [];
//             }

//             if (!saved.includes(title)) {
//                 saved.push(title);
//             }

//             localStorage.setItem("basket_product_name", JSON.stringify(saved));

//         }
//     };
// });

// allproducts.forEach(product => {
//     let favoritesBtn = product.querySelector(".favorites");
//     let favoritesImg = product.querySelector(".favorites img");
//     let text = product.querySelector(".a");

//     favoritesBtn.onclick = (e) => {
//         e.stopPropagation();

//         let title = text.textContent.trim();

//         let saved = [];
//         try {
//             saved = JSON.parse(localStorage.getItem("favorites_product_name")) || [];
//         } catch {
//             saved = [];
//         }

//         if (favoritesBtn.classList.contains("noselect")) {
//             favoritesImg.src = "/public/Vector (1).png";

//             favoritesBtn.classList.remove("noselect");
//             favoritesBtn.classList.add("select");

//             if (!saved.includes(title)) {
//                 saved.push(title);
//             }
//         } else {
//             favoritesImg.src = "/public/Vector.png";

//             favoritesBtn.classList.add("noselect");
//             favoritesBtn.classList.remove("select");

//             saved = saved.filter(item => item !== title);
//         }

//         localStorage.setItem("favorites_product_name", JSON.stringify(saved));


//         // let favorites = JSON.parse(localStorage.getItem("favorites_product_name")) || [];
//         // favorites.forEach(favorite => {
//         //     let filtered = products.filter(p => favorite.includes(p.title));
//         //     if (text.textContent.includes(filtered)) {
//         //         console.log(text.textContent);

//         //     }
//         // });

//         let favorites = JSON.parse(localStorage.getItem("favorites_product_name")) || [];
//         console.log(favorites);

//         favorites.forEach(favorite => {
//             let matched = products.find(p => p.title === favorite);
// console.log(favorite);

//             if (matched && text.textContent.includes(matched.title)) {
//                 console.log(text.textContent);
//             }
//         });

//     };
// });

allproducts.forEach(product => {
    let favoritesBtn = product.querySelector(".favorites");
    let favoritesImg = product.querySelector(".favorites img");
    let text = product.querySelector(".a_title_a");
    let title = text.textContent.trim();

    let saved = JSON.parse(localStorage.getItem("favorites_product_name")) || [];
    if (saved.includes(title)) {
        favoritesBtn.classList.remove("noselect");
        favoritesBtn.classList.add("select");
        favoritesImg.src = "/public/Vector (1).png";
    }

    favoritesBtn.onclick = (e) => {
        e.stopPropagation();

        let saved = JSON.parse(localStorage.getItem("favorites_product_name")) || [];
        console.log(saved);


        if (favoritesBtn.classList.contains("noselect")) {
            favoritesBtn.classList.remove("noselect");
            favoritesBtn.classList.add("select");
            favoritesImg.src = "/public/Vector (1).png";

            if (!saved.includes(title)) {
                saved.push(title);
            }
        } else {
            favoritesBtn.classList.remove("select");
            favoritesBtn.classList.add("noselect");
            favoritesImg.src = "/public/Vector.png";

            saved = saved.filter(t => t !== title);
        }

        localStorage.setItem("favorites_product_name", JSON.stringify(saved));
    };
});


let block_menu = document.querySelectorAll(".block_menu")
// let Icon = document.querySelectorAll("Icon")

block_menu.forEach(menu => {
    menu.onclick = () => {
        block_menu.forEach(block => {
            block.classList.remove("small")
        })
        menu.classList.add("small")
    }
})


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