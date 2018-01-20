const { getOptions } = require('loader-utils');

module.exports = function(source, map) {

  // Include webpack options
  const options = getOptions(this);
  
  // Get exported function names
  let exportedFuncs = [];
  const getExports = new RegExp(/module\.exports+(=|= | = | =)+[\{\}\,\ \w\;]+/);
  source.replace(getExports, (expString) => {
    const varString = expString.replace(/module\.exports+(=|= | = | =)/, '');
    exportedFuncs = varString.match(/\w+/g);
  });

  const funcHash = `const funcHash = {${[...exportedFuncs]}};\n`;
  const funcCall = `const output = e.data[functionName](payload);\n`;
  const postMessage = 'postmessage(output);\n';
  
  source = source.replace(getExports, '');
  source = 'onmessage = (e) => {' + funcHash + source + funcCall + postMessage + '};';

  this.callback(null, source, map);
};