var parsers = {},
    exts = {};

function register(name, extensions, fn) {
  parsers[name] = fn;
  (extensions || []).forEach(function(ext) {
    exts[ext] = name;
  });
}

function nameFromExtension(ext) {
  return exts[ext];
}

function exists(name) {
  return parsers.hasOwnProperty(name);
}

function parseAs(name, input) {
  if (exists(name)) {
    return parsers[name](input);
  }

  return new Promise(function(_, reject) {
    reject("No such parser: " + name);
  });
}

function parsersList() {
  return Object.keys(parsers);
}

exports.register = register;
exports.nameFromExtension = nameFromExtension;
exports.exists = exists;
exports.parseAs = parseAs;
exports.parsers = parsersList;
