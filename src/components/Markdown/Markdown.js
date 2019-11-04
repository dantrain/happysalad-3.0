import React from 'react';
import unified from 'unified';
import remarkToRehype from 'remark-rehype';
import rehypeToReact from 'rehype-react';

const processor = unified()
  .use(remarkToRehype)
  .use(rehypeToReact, { createElement: React.createElement });

const Markdown = ({ ast }) => processor.stringify(ast);

export default Markdown;
