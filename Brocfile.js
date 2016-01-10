const funnel = require('broccoli-funnel');
const concat = require('broccoli-concat');
const mergeTrees = require('broccoli-merge-trees');
const esTranspiler = require('broccoli-babel-transpiler');
const pkg = require('./package.json');

const src = 'src';

const indexHtml = funnel(src, {
  files: ['index.html']
});

const js = esTranspiler(src, {
  moduleRoot: pkg.name,
  moduleIds: true,
  modules: 'amd'
});

const main = concat(js, {
  inputFiles: [
    '**/*.js'
  ],
  outputFile: '/' + pkg.name + '.js'
});

module.exports = mergeTrees([main, indexHtml]);
