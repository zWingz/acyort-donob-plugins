let toc
let stay
let heading
let tocIcon
function $(string) {
  const dom = document.querySelectorAll(string)
  return Array.prototype.slice.call(dom)
}
/**
 * 根据滚动距离设置锚点
 * 取离顶部最近的那一个
 * 既getBoundingClientRect.top + height / 2.5 > 0
 */
function setAnchorActive() {
  const targets = heading.filter(each => {
    const prev = each.previousElementSibling
    if(!prev) return [each]
    const rect = prev.getBoundingClientRect()
    // return (rect.top + rect.height )> 0
    return (rect.top + rect.height / 2) < 0
  })
  const target = targets.slice(-1)[0]
  if(!target) return
  const len = targets.length - 1
  tocIcon.style.transform = `translate3d(0, ${len * 19}px,0) rotate(45deg)`
  $('.toc a').forEach(function(each) {
    each.classList.remove('active')
  })
  const id = encodeURI(target.id)
  document.querySelector(`.toc a[href="#${id}"]`).classList.add('active')
}

function fixedToc() {
  const scrollY = window.scrollY
  tocTop = toc.getBoundingClientRect().top
  if(tocTop <= scrollY) {
    stay.classList.add('fixed')
  } else {
    stay.classList.remove('fixed')
  }
}

function calc() {
  toc && fixedToc()
  setAnchorActive()
}

document.addEventListener('DOMContentLoaded', function() {
  toc = document.querySelector('.toc')
  stay = document.querySelector('.stay')
  heading = $('.post-content .heading')
  tocIcon = document.querySelector('.toc-icon')
  if(!heading.length) {
    return
  }
  calc()
  window.addEventListener('scroll', () => {
    calc()
  }, {
    passive: true
  })
})
