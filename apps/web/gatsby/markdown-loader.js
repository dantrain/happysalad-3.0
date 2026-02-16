let processorPromise;

function getProcessor() {
  if (!processorPromise) {
    processorPromise = Promise.all([
      import('unified'),
      import('remark-parse'),
      import('remark-rehype'),
    ]).then(([{ unified }, remarkParse, remarkToRehype]) =>
      unified()
        .use(remarkParse.default)
        .use(remarkToRehype.default)
    );
  }
  return processorPromise;
}

module.exports = function (source) {
  const callback = this.async();

  getProcessor()
    .then((processor) => {
      const output = processor.runSync(processor.parse(source));
      callback(null, `export default ${JSON.stringify(output)}`);
    })
    .catch(callback);
};
