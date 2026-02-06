import { ReactElement } from 'react';
import * as prod from 'react/jsx-runtime';
import { unified } from 'unified';
import rehypeReact from 'rehype-react';

const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

const processor = unified().use(rehypeReact, production);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MarkdownProps = { ast: any };

const Markdown: React.FC<MarkdownProps> = ({ ast }) =>
  processor.stringify(ast) as unknown as ReactElement;

export default Markdown;
