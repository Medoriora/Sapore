"use strict";
const parentMarquee3 = document.querySelector(".marquee-wrapper3");
const childMarquee3 = document.querySelector(".marquee-content3");
// will clone the child node of Parent Marquee or copy the sibling 

// code below will allow a draggable feature for the marquee carousel 
const ulParentListContainer3 = document.querySelector('.marquee-wrapper3');
let isDragging3 = false;
const dragStart3 = (e) => {
    if (!isDragging3)
        return;
    ulParentListContainer3.scrollLeft -= e.movementX;
};
const stopDragging3 = () => {
    isDragging3 = false;
};
// when mouse is pressed 
ulParentListContainer3.addEventListener('mousedown', () => isDragging3 = true);
// when mouse is move to left
ulParentListContainer3.addEventListener('mousemove', dragStart3);
// when mouse pressed is released
window.addEventListener('mouseup', stopDragging3);
