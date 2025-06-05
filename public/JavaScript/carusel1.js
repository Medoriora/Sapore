"use strict";
const parentMarquee1 = document.querySelector(".marquee-wrapper1");
const childMarquee1 = document.querySelector(".marquee-content1");
// will clone the child node of Parent Marquee or copy the sibling 

// code below will allow a draggable feature for the marquee carousel 
const ulParentListContainer1 = document.querySelector('.marquee-wrapper1');
let isDragging1 = false;
const dragStart1 = (e) => {
    if (!isDragging1)
        return;
    ulParentListContainer1.scrollLeft -= e.movementX;
};
const stopDragging1 = () => {
    isDragging1 = false;
};
// when mouse is pressed 
ulParentListContainer1.addEventListener('mousedown', () => isDragging1 = true);
// when mouse is move to left
ulParentListContainer1.addEventListener('mousemove', dragStart1);
// when mouse pressed is released
window.addEventListener('mouseup', stopDragging1);
