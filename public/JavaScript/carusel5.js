"use strict";
const parentMarquee5 = document.querySelector(".marquee-wrapper5");
const childMarquee5 = document.querySelector(".marquee-content5");
// will clone the child node of Parent Marquee or copy the sibling 

// code below will allow a draggable feature for the marquee carousel 
const ulParentListContainer5 = document.querySelector('.marquee-wrapper5');
let isDragging5 = false;
const dragStart5 = (e) => {
    if (!isDragging5)
        return;
    ulParentListContainer5.scrollLeft -= e.movementX;
};
const stopDragging5 = () => {
    isDragging5 = false;
};
// when mouse is pressed 
ulParentListContainer5.addEventListener('mousedown', () => isDragging5 = true);
// when mouse is move to left
ulParentListContainer5.addEventListener('mousemove', dragStart5);
// when mouse pressed is released
window.addEventListener('mouseup', stopDragging5);
