import React, { ReactElement } from 'react';
import unified from 'unified';
import { Node } from 'unist';
import rehypeToReact from 'rehype-react';

const processor = unified().use(rehypeToReact, {
  createElement: React.createElement,
});

type MarkdownProps = { ast: Node };

const Markdown: React.FC<MarkdownProps> = ({ ast }) =>
  // "When using TypeScript, cast the type on your side"
  // https://github.com/rehypejs/rehype-react#api
  (processor.stringify(ast) as unknown) as ReactElement;

export default Markdown;
