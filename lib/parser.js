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

function parseAs(name, input, done) {
  var ok = exists(name);

  if (ok) {
    parsers[name](input, done);
  }

  return ok;
}

function parsersList() {
  return Object.keys(parsers);
}

exports.register = register;
exports.nameFromExtension = nameFromExtension;
exports.exists = exists;
exports.parseAs = parseAs;
exports.parsers = parsersList;
