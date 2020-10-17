const unified = require('unified');
const remarkParse = require('remark-parse');
const remarkToRehype = require('remark-rehype');

const processor = unified().use(remarkParse).use(remarkToRehype);

module.exports = function (source) {
  const output = processor.runSync(processor.parse(source));

  return `export default ${JSON.stringify(output)}`;
};
