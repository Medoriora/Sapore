"use strict";
const parentMarquee4 = document.querySelector(".marquee-wrapper4");
const childMarquee4 = document.querySelector(".marquee-content4");
// will clone the child node of Parent Marquee or copy the sibling 

// code below will allow a draggable feature for the marquee carousel 
const ulParentListContainer4 = document.querySelector('.marquee-wrapper4');
let isDragging4 = false;
const dragStart4 = (e) => {
    if (!isDragging4)
        return;
    ulParentListContainer4.scrollLeft -= e.movementX;
};
const stopDragging4 = () => {
    isDragging4 = false;
};
// when mouse is pressed 
ulParentListContainer4.addEventListener('mousedown', () => isDragging4 = true);
// when mouse is move to left
ulParentListContainer4.addEventListener('mousemove', dragStart4);
// when mouse pressed is released
window.addEventListener('mouseup', stopDragging4);
