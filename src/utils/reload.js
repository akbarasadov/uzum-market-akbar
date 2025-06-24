export function reload(arr, component, place) {

    place.innerHTML = ""

    for (const item of arr) {
        const elem = component(item)
        place.append(elem)
    }
}