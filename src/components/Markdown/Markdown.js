import React from 'react';
import unified from 'unified';
import rehypeToReact from 'rehype-react';

const processor = unified().use(rehypeToReact, {
  createElement: React.createElement,
});

const Markdown = ({ ast }) => processor.stringify(ast);

export default Markdown;
