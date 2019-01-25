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
  const dom = $('.post-content .heading-anchor')
  const target = dom.filter(each => {
      const rect = each.getBoundingClientRect()
      return rect.top + rect.height / 2.5 > 0
  })[0]
  $('.toc a').forEach(function(each) {
    each.classList.remove('active')
  })
  document.querySelector(`.toc a[href="#${target.id}"]`).classList.add('active')
}


document.addEventListener('DOMContentLoaded', function() {
  setAnchorActive()
  window.addEventListener('scroll', () => {
    setAnchorActive()
  })
})
