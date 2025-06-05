"use strict";
const parentMarquee2 = document.querySelector(".marquee-wrapper2");
const childMarquee2 = document.querySelector(".marquee-content2");
// will clone the child node of Parent Marquee or copy the sibling 

// code below will allow a draggable feature for the marquee carousel 
const ulParentListContainer2 = document.querySelector('.marquee-wrapper2');
let isDragging2 = false;
const dragStart2 = (e) => {
    if (!isDragging2)
        return;
    ulParentListContainer2.scrollLeft -= e.movementX;
};
const stopDragging2 = () => {
    isDragging2 = false;
};
// when mouse is pressed 
ulParentListContainer2.addEventListener('mousedown', () => isDragging2 = true);
// when mouse is move to left
ulParentListContainer2.addEventListener('mousemove', dragStart2);
// when mouse pressed is released
window.addEventListener('mouseup', stopDragging2);
