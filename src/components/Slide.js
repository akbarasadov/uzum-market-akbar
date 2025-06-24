import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export function Slide(item) {

    const swiperSlide = document.createElement("div")

    swiperSlide.classList.add("swiper-slide")
    swiperSlide.innerHTML = `
        <img src="${item.image}" alt="${item.alt}">
    `



    let swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination, Autoplay],
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },

        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }

    });



    return swiperSlide
}