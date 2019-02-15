
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
  export function parseMd(content: string, opt: parseMdOption = {}): string
  export function toc(md: string): string
}
