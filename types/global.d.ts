declare module '*.module.css' {
  const classes: { [className: string]: string };
  export = classes;
}

declare module '*.md' {
  import { Node } from 'unist';
  export const content: Node;
  export default content;
}
