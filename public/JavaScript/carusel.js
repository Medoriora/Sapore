"use strict";

const initializeCarousel = (selector) => {
    const container = document.querySelector(selector);
    if (!container) return; // Проверяем, существует ли элемент

    let isDragging = false, startX, scrollLeft;

    const dragStart = (e) => {
        isDragging = true;
        startX = e.pageX || e.touches[0].pageX;
        scrollLeft = container.scrollLeft;
    };

    const dragMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX || e.touches[0].pageX;
        const walk = (startX - x) * 2; // Скорость прокрутки
        container.scrollLeft = scrollLeft + walk;
    };

    const stopDragging = () => {
        isDragging = false;
    };

    container.addEventListener('mousedown', dragStart);
    container.addEventListener('mousemove', dragMove);
    window.addEventListener('mouseup', stopDragging);

    container.addEventListener('touchstart', dragStart);
    container.addEventListener('touchmove', dragMove);
    container.addEventListener('touchend', stopDragging);
};

// Инициализация всех каруселей
const carousels = [
    '.marquee-wrapper',   // Для карусели без номера
    '.marquee-wrapper1',  // Для первой карусели
    '.marquee-wrapper2',  // Для второй карусели
    '.marquee-wrapper3',  // Для третьей карусели
    '.marquee-wrapper4',  // Для четвертой карусели
    '.marquee-wrapper5',  // Для пятой карусели
    '.marquee-wrapper6'   // Для шестой карусели
];

carousels.forEach(selector => initializeCarousel(selector));