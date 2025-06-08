"use strict";
const ulParentListContainer1 = document.querySelector('.marquee-wrapper1');
let isDragging1 = false, startX, scrollLeft;

// Начало перетаскивания
const dragStart1 = (e) => {
    isDragging1 = true;
    startX = e.pageX || e.touches[0].pageX; // Для мобильных устройств используем touches
    scrollLeft = ulParentListContainer1.scrollLeft;
};

// Перетаскивание
const dragMove1 = (e) => {
    if (!isDragging1) return;
    const x = e.pageX || e.touches[0].pageX; // Для мобильных устройств используем touches
    const walk = (startX - x) * 2; // Увеличиваем чувствительность
    ulParentListContainer1.scrollLeft = scrollLeft + walk;
};

// Завершение перетаскивания
const stopDragging1 = () => {
    isDragging1 = false;
};

// Добавляем обработчики событий
ulParentListContainer1.addEventListener('mousedown', dragStart1);
ulParentListContainer1.addEventListener('mousemove', dragMove1);
window.addEventListener('mouseup', stopDragging1);

// Для мобильных устройств
ulParentListContainer1.addEventListener('touchstart', dragStart1);
ulParentListContainer1.addEventListener('touchmove', dragMove1);
ulParentListContainer1.addEventListener('touchend', stopDragging1);