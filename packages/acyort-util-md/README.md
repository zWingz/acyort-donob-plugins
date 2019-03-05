# `acyort-util-md`

- use [remark](https://github.com/remarkjs/remark) to parse markdown
- use [prismjs](https://github.com/PrismJS/prism) to hightlight
- use [gatsby-remark-prismjs](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-prismjs/README.md) adapted `remark` and `prismjs`
- use [prettier](https://github.com/prettier/prettier) to format `code`
- use [github-slugger](https://github.com/Flet/github-slugger) and [markdown-toc](https://github.com/jonschlinkert/markdown-toc) to generate `toc`
- use [remark-container](https://github.com/zWingz/remark-container) to parse `:::` syntax to `div.container`, like [vuepress/markdown-container](https://v1.vuepress.vuejs.org/guide/markdown.html#custom-containers)

## Usage

```javascript
const { toc, parseMd } = require('acyort-util-md');
const md = '#heading'
const tocHTML = toc(md)
const contentHTML = parseMd(md, {
  // see https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/#how-to-use
  highlightOpt: {}
})
```

## Types

```typescript
interface parseMdOption {
  highlightOpt?: {
    classPrefix?: string,
    aliases?: {
      [key: string]: string
    },
    showLineNumbers?: boolean,
    noInlineHighlight?: boolean,
  }
}

declare module 'acyort-util-md' {
  export function parseMd(content: string, opt?: parseMdOption): string;
  export function toc(md: string): string;
}
```

## Markdown Extensions

### toc and heading

use the same slug to parse `html` and generate `toc`

- [autolink-headings](https://github.com/remarkjs/remark-autolink-headings)
- [heading-slug](https://github.com/remarkjs/remark-slug)

input

```text
# hefd A b c
## heading2
```

output

```html
<!-- toc -->
<ul>
  <li>
    <a href="#hefd-a-b-c">hefd A b c</a>
    <ul>
      <li><a href="#heading2">heading2</a></li>
    </ul>
  </li>
</ul>

<!-- body -->
<h1 id="hefd-a-b-c" class="heading">
  <a href="#hefd-a-b-c" aria-hidden="true">
    <span class="icon icon-link"></span>
  </a>hefd A b c
</h1>
<h2 id="heading2" class="heading">
  <a href="#heading2" aria-hidden="true">
    <span class="icon icon-link"></span>
  </a>
  heading2
</h2>
```

### code

- [prismjs-hightlight](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/#gatsby-remark-prismjs)
- [Line numbering](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/#line-numbering)
- [Line highlighting](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/#line-highlighting)

### block-container

input

``` text
::: tip
This is content
:::
```

output

```html
<div class="remark-container tip">
  <p class="remark-container-title">TIP</p>
  <p>this is content</p>
</div>
```
