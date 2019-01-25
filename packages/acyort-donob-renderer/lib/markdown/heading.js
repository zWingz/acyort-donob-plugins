const { slugify } = require('markdown-toc/lib/utils')

function heading(text, level) {
  const id = slugify(text)
  const decode = encodeURI(id)
  return `
    <h${level} id="${decode}" class="heading">
      <a href="#${decode}" class="heading-anchor"></a>${text}
    </h${level}>
  `
}

module.exports = heading
