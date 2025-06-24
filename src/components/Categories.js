export function Categories(item) {
    let p = document.createElement("p");
    p.textContent = item.title;
    

    p.onclick = () => {
        localStorage.setItem("categoryID", item.id)
        window.location.href = "/pages/catalog/index.html"
    }

    return p;
}