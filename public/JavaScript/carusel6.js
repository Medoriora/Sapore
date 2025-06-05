"use strict";
const parentMarquee6 = document.querySelector(".marquee-wrapper6");
const childMarquee6 = document.querySelector(".marquee-content6");
// will clone the child node of Parent Marquee or copy the sibling 

// code below will allow a draggable feature for the marquee carousel 
const ulParentListContainer6 = document.querySelector('.marquee-wrapper6');
let isDragging6 = false;
const dragStart6 = (e) => {
    if (!isDragging6)
        return;
    ulParentListContainer6.scrollLeft -= e.movementX;
};
const stopDragging6 = () => {
    isDragging6 = false;
};
// when mouse is pressed 
ulParentListContainer6.addEventListener('mousedown', () => isDragging6 = true);
// when mouse is move to left
ulParentListContainer6.addEventListener('mousemove', dragStart6);
// when mouse pressed is released
window.addEventListener('mouseup', stopDragging6);