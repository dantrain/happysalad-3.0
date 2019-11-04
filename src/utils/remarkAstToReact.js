import React from 'react';
import unified from 'unified';
import remarkToRehype from 'remark-rehype';
import rehypeToReact from 'rehype-react';

const processor = unified()
  .use(remarkToRehype)
  .use(rehypeToReact, { createElement: React.createElement });

export default htmlAst => processor.stringify(htmlAst);
