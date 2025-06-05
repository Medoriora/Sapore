const mask = $('h1 .macks')

// Mousemove
window.addEventListener('mousemove', e => {
  let halfMaskSize = 250
  if (window.innerWidth >= 1400) {
    halfMaskSize = 400
  }
  
  let h1 = document.getElementById('heading'),
      h1Pos = h1.getBoundingClientRect(),
      h1Width = h1.offsetWidth,
      h1Height = h1.offsetHeight,
      clipX = e.clientX - h1Pos.left,
      clipY = e.clientY - h1Pos.top,
      maskX = e.clientX - h1Pos.left - halfMaskSize,
      maskY = e.clientY - h1Pos.top - halfMaskSize
  
  // If cursor outside bounds of H1 set positions at bounds
    if (e.clientY <= h1Pos.top) { //Top
      clipY = 0
      maskY = -(halfMaskSize)
    }
    if (e.clientX >= h1Pos.left + h1Width) { //Right
      clipX = h1Width
      maskX = -(halfMaskSize * 0.75) + h1Width
    }
    if (e.clientY >= h1Pos.top + h1Height) { //Bottom
      clipY = h1Height
      maskY = -(halfMaskSize * 0.75) + h1Height
    }
    if (e.clientX <= h1Pos.left) { //Left
      clipX = 0
      maskX = -(halfMaskSize)
    }
  
  // Change clip & mask position using GSAP
  gsap.to(mask, {
    duration: 1,
    '--mask-position': maskX + 'px ' + maskY + 'px',
    '--clip-position': clipX + 'px ' + clipY + 'px'
  })
})