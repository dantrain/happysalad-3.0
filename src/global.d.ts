declare module '*.module.css' {
  export const content: { [className: string]: string };
  export default content;
}

declare module '*.md' {
  import { Node } from 'unist';
  export const content: Node;
  export default content;
}

declare module 'rehype-react' {
  import { Plugin } from 'unified';
  export const rehypeToReact: Plugin;
  export default rehypeToReact;
}
