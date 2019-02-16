# `acyort-util-md`

- use `remark` to parse markdown
- use `prismjs` to hightlight
- use `gatsby-remark-prismjs` adapted `remark` and `prismjs`
- use `prettier` to format `code`
- use `github-slugger` and `markdown-toc` to generate `toc`

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
