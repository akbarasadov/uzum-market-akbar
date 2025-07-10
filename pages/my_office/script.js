import { issued_product } from "../../src/components/issued"
import { reload } from "../../src/utils/reload.js"


let sidebar = document.querySelector(".sidebar ul")
let main = document.querySelector(".main")

let orders = sidebar.querySelector(".orders")
let reviews = sidebar.querySelector(".reviews")
let profile = sidebar.querySelector(".profile")
let categ = sidebar.querySelectorAll(".categ")

let password = localStorage.getItem("userspassword")
let email = localStorage.getItem("usersemail")

let res2 = await fetch(`http://localhost:8080/users?email=${email}&password=${password}`);
let users = await res2.json()



orders.onclick = async () => {

    let issued = [];
    try {
        issued = JSON.parse(localStorage.getItem("issued")) || [];
    } catch {
        issued = [];
    }

    if (issued.length > 0) {
        main.classList.add("bg-border")
        let arr = []

        for (let title of issued) {
            let encodedTitle = encodeURIComponent(title);
            let res = await fetch(`http://localhost:8080/products?title=${encodedTitle}`);
            let users = await res.json();

            if (users.length > 0) {
                arr.push(users[0])

                reload(arr, issued_product, main)
            }
        }
    } else {
        main.innerHTML = `
            <div class="order-tabs">
                <button class="tab active">Все заказы</button>
            </div>
            <div class="empty-state">
                <h3>Здесь пусто</h3>
                <p>У вас еще не было ни одного заказа!<br>Воспользуйтесь поиском, чтобы найти всё что нужно.</p>
                <button class="shop-btn">Начать покупки</button>
                <center>
                    <a href="/index.html" class="back-link">Вернуться на главную</a>
                </center>
            </div>
        `;
    }
    orders.classList.add("active");
    reviews.classList.remove("active");
    profile.classList.remove("active");
};




reviews.onclick = () => {
    main.innerHTML = `
            <h1 class="categ_title">Мои отзывы</h1>
            <div class="order-tabs">
                <button class="tab active">Ждут оценку</button>
            </div>
            <div class="empty-state1">
                <img src="https://uzum.uz/_ipx/_/images/empty-cart.png" alt="">
                <h2>Товары для оценки появятся здесь после покупки</h2>
                <p>Делитесь впечатлениями — это поможет сделать выбор другим покупателям</p>
                <a href="/index.html" class="shop-btn">Перейти на главную</a>
            </div>
    `
    orders.classList.remove("active")
    reviews.classList.add("active")
    profile.classList.remove("active")

    main.classList.remove("bg-border")
}

profile.onclick = () => {
    main.innerHTML = `
    <h1 class="categ_title">Мои данные</h1>
    <form class="profile-form">
        <div class="block123">
                <div class="form-group">
                    <label>Фамилия <p style="color: red;">*</p></label>
                    <input value="${users[0].first_name}" type="text" required>
                </div>
                <div class="form-group">
                    <label>Имя <p style="color: red;">*</p></label>
                    <input value="${users[0].name}" type="text" required>
                </div>
                <div class="form-group">
                    <label>Отчество</label>
                    <input type="text">
                </div>
                <div class="form-group">
                    <label>Дата рождения</label>
                    <input type="date">
                </div>
                <div class="form-group">
                    <label>Электронная почта <p style="color: red;">*</p></label>
                    <input type="email" required>
                </div>
                <div class="form-group">
                    <label>Номер телефона <p style="color: red;">*</p></label>
                    <div class="phone-wrapper">
                        <span>+998</span>
                        <input type="tel" placeholder="-- --- -- --" required>
                    </div>
                </div>
        </div>
        <div class="action_bottom">
            <button class="hover">Выйти из системы</button>
        </div>
    </form>
    `

    // <div class="actions">
    //     <button class="cancel hover">Отменить</button>
    //     <button class="save">Сохранить</button>
    // </div>

    orders.classList.remove("active")
    reviews.classList.remove("active")
    profile.classList.add("active")

    main.classList.remove("bg-border")
}