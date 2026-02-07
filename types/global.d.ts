declare module '*.module.css' {
  const classes: { [className: string]: string };
  export = classes;
}

declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module '*.md' {
  import { Node } from 'unist';
  export const content: Node;
  export default content;
}
