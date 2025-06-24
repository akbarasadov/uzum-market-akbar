document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector(".button");

  button.onclick = async (event) => {
    event.preventDefault();

    let email = document.querySelector(".email");
    let name = document.querySelector(".name");
    let first_name = document.querySelector(".first_name");
    let password = document.querySelector(".password");

    if (
      email.value.trim() === "" ||
      password.value.trim() === "" ||
      name.value.trim() === "" ||
      first_name.value.trim() === ""
    ) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    const user = {
      email: email.value.trim(),
      name: name.value.trim(),
      first_name: first_name.value.trim(),
      password: password.value.trim(),
      favorites: [],
      basket: []
    };

    try {
      const res = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      let res1 = await fetch(`http://localhost:8080/users?email=${email.value}&password=${password.value}`);
      let users = await res1.json()

      localStorage.setItem("userspassword", users[0].password)
      localStorage.setItem("usersemail", users[0].email)


      if (users.length === 0) {
        // alert("Такого аккаунта не существует")
        window.location.href = "/pages/sign-up/index.html"
      }

      window.location.href = "/index.html";

      localStorage.setItem("users", user);


    } catch (error) {
      alert("Ошибка подключения: " + error.message);
    }
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