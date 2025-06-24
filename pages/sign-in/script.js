document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector(".button");

    button.onclick = async (event) => {
        event.preventDefault();

        let email = document.querySelector(".email");
        let password = document.querySelector(".password");

        if (email.value.trim() === "" || password.value.trim() === "") {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        try {
            let res = await fetch("http://localhost:8080/users");

            let res1 = await fetch(`http://localhost:8080/users?email=${email.value}&password=${password.value}`);
            let users = await res1.json()

            console.log(users[0].email);
            

            localStorage.setItem("userspassword", users[0].password)
            localStorage.setItem("usersemail", users[0].email)


            if (users.length === 0) {
                // alert("Такого аккаунта не существует")
                window.location.href = "/pages/sign-up/index.html"
            }

            if (res.ok) {
                window.location.href = "/index.html";
            } else {
                const errorData = await res.json();
                alert("Ошибка: " + (errorData.message + "Неизвестная ошибка"));
            }
        } catch (error) {
            alert("Ошибка подключения: " + error.message);
        }
    };
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