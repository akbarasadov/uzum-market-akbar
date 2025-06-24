import { Categories } from "../../src/components/Categories";
import { Products } from "../../src/components/Product";
import { reload } from "../../src/utils/reload";

let h1 = document.querySelector("h1.yes");
let p = document.querySelector("p.yes");
let grid = document.querySelector(".grid");
let searched_text = localStorage.getItem("search");
let searched_products = document.querySelector(".searched_products");

let search_container = document.querySelector(".search-container");

let res = await fetch("http://localhost:8080/products");
let products = await res.json();

let res1 = await fetch("http://localhost:8080/categories");
let categoryData = await res1.json();

let searchText = searched_text.toLowerCase();

let categ = document.querySelector(".categ")

reload(categoryData, Categories, categ)


let filteredProducts = products.filter(product => {
    return (
        product.title.toLowerCase().includes(searchText) ||
        product.type.toLowerCase().includes(searchText) ||
        product.categ.toLowerCase().includes(searchText)
    );
})

let diagonals = [];

filteredProducts.forEach(product => {
    let d = product.dioganal;

    if (Array.isArray(d)) {
        diagonals.push(...d);
    } else if (d === "string" && d.trim() !== "") {
        diagonals.push(d);
    }
});

let uniquediagonals = [...new Set(diagonals)];




if (uniquediagonals.length !== 0) {

    let All_diagonals = document.querySelector(".diagonals");
    All_diagonals.innerHTML = "";

    for (const diagonal of uniquediagonals) {
        let div = document.createElement("div");
        div.classList.add("to_diagonal");

        div.innerHTML = `
        <input type="checkbox" class="checkbox">
        <p class="diagonal">${diagonal}</p>
        `;

        All_diagonals.append(div);
    }

}




let colors = [];

filteredProducts.forEach(product => {
    colors.push(...product.colors);
});

let uniqueColors = [...new Set(colors)];

let All_colors = document.querySelector(".colors");
All_colors.innerHTML = "";

for (const color of uniqueColors) {
    let div = document.createElement("div");
    div.classList.add("to_color");

    div.innerHTML = `
        <div class="color" style="background-color: ${color}"></div>
        <p>${color}</p>
    `;

    All_colors.append(div);
}


let flex_left = document.querySelector(".flex_left")
let search_dropdown = document.querySelector(".search-dropdown")
let all_colors = document.querySelector(".all_colors")
let all_diagonal = document.querySelector(".all_diagonal")


if (filteredProducts.length === 0) {
    searched_products.innerHTML = `
        <img class="none_img" src="https://uzum.uz/static/img/penguin.a739ac8.png" alt="">
        <h1 class="none_h1">Мы не нашли то, что вы искали</h1>
        <p class="none_p">Возможно, в названии товара ошибка или у нас пока нет такого товара</p>
    `;


    searched_products.classList.add("none");
    flex_left.classList.add("none");
    search_dropdown.classList.remove("search_left")
    search_dropdown.classList.add("search_left_none")
} else {
    searched_products.classList.remove("none");
    flex_left.classList.remove("none");
    search_dropdown.classList.remove("search_left_none")

    search_container.classList.add("search_left_yes")

    if (uniqueColors.length === 0) {
        all_colors.innerHTML = ""
    }
    if (uniquediagonals.length === 0) {
        all_diagonal.innerHTML = ""
    }


    h1.textContent = searched_text;
    p.textContent = filteredProducts.length + " товаров";
    reload(filteredProducts, Products, grid);
}

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
};

let clear = document.querySelector(".clear");
let all_searches = document.querySelector(".recent-searches");
let searched = document.querySelector(".searched");
let background = document.querySelector(".background");
let searchInput = document.querySelector(".input_search");

searchInput.value = searched_text

searchInput.onclick = () => {
    searchInput.classList.add("click");
    search_container.classList.add("click");
    searched.classList.add("click");
    header.classList.add("click");
    background.classList.add("click");
};

background.onclick = () => {
    searchInput.classList.remove("click");
    search_container.classList.remove("click");
    searched.classList.remove("click");
    header.classList.remove("click");
    background.classList.remove("click");
};

searchInput.onsearch = () => {
    localStorage.setItem("search", searchInput.value);
    window.location.href = "/pages/search/index.html";
};


clear.onclick = () => {
    search_container.textContent = "";
    searchInput.classList.remove("click");
    localStorage.removeItem("myProducts");
};

let checkboxes = document.querySelectorAll(".checkbox")

checkboxes.forEach(checkbox => {
    checkbox.onclick = () => {
        if (checkbox.checked) {
            checkbox.classList.add("checkbox_checked")
        }
    }

})


clear.onclick = () => {
    localStorage.removeItem("myProducts");
};


// let stored = JSON.parse(localStorage.getItem("myProducts")) || [];


// let newProduct = { name: searchInput.value.trim() };


// if (newProduct.name !== "") {
//     stored.push(newProduct);
//     localStorage.setItem("myProducts", JSON.stringify(stored));
// }

// let data = localStorage.getItem("myProducts");

// if (data) {
//     let parsedProducts = JSON.parse(data);
//     let place = document.querySelector(".recent-searches");

//     place.innerHTML = "";

//     let parsed = [...new Set(parsedProducts)];


//     for (const searchedname of parsed) {
//         let div = document.createElement("div");
//         div.classList.add("searched_block");

//         div.innerHTML = `
//             <div class="left_li">
//                 <img src="https://marketplace.canva.com/Njmq0/MADBWZNjmq0/2/tl/canva-time-icon-MADBWZNjmq0.png" alt="">
//                 <p>${searchedname.name}</p>
//             </div>
//             <span class="remove">✖</span>
//         `;

//         place.appendChild(div);
//     }
// }


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
        }
    }

    block.onclick = () => {
        let text = block.querySelector("p")
        window.location.href = "/pages/search/index.html"
        localStorage.setItem("search", text.textContent)
    }
})


// searchInput.oninput = () => {
//     let include = searchInput.value
//     filteredProducts.forEach(filter =>{
//         console.log(filter.includes(include));
//     })
// }

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

        // let parsedProducts = [new Set(product)];

        // console.log(parsedProducts);
        

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


let allproducts = document.querySelectorAll(".product")

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

let res2 = await fetch(`http://localhost:8080/users?email=${email}&password=${password}`);
let users = await res2.json()

if (password || email) {
    sign_text.textContent = users[0].name
    sign.setAttribute("href", "")
} else {
    sign_text.textContent = "Войти"
    sign.setAttribute("href", "/pages/sign-in/index.html")
}