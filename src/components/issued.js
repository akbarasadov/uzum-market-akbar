export function issued_product(item) {
    let issued_products = document.createElement("div")
    issued_products.className = "issued_products"

    issued_products.innerHTML = `
                <h1 class="ID">ID заказа ${Math.floor(Math.random() * 1000000000)}</h1>
                <div class="flex">
                    <div class="blocks">    
                        <p class="q12">Статус:</p>
                        <p class="status ri1">Выдан покупателю</p>
                    </div>
                    <div class="blocks">
                        <p class="q12">Сумма заказа:</p>
                        <p class="price ri1">${item.price.toLocaleString()} сум</p>
                    </div>
                    <p class="grafic">График работы</p>
                    <div class="blocks">
                        <p class="q12">Понедельник</p>
                        <p class="price ri1">10:00 - 18:00</p>
                    </div>
                    <div class="blocks">
                        <p class="q12">Вторник</p>
                        <p class="price ri1">10:00 - 18:00</p>
                    </div>
                    <div class="blocks">
                        <p class="q12">Среда</p>
                        <p class="price ri1">10:00 - 18:00</p>
                    </div>
                    <div class="blocks">
                        <p class="q12">Четверг</p>
                        <p class="price ri1">10:00 - 18:00</p>
                    </div>
                    <div class="blocks">
                        <p class="q12">Пятница</p>
                        <p class="price ri1">10:00 - 18:00</p>
                    </div>
                    <div class="blocks">
                        <p class="q12">Суббота</p>
                        <p class="price ri1">10:00 - 18:00</p>
                    </div>
                    <div class="blocks">
                        <p class="q12">Воскресенье</p>
                        <p class="price ri1">10:00 - 18:00</p>
                    </div>
                </div>
    `

    return issued_products
}