var django = require('./django');

if (global.django && global.django.gettext) {
  django = global.django;
}

Object.defineProperty(String.prototype, 'format', {
  value: function test() {
    var args = Array.prototype.slice.call(arguments, 0);
    return django.interpolate(this, args);
  },
  configurable: true,
  enumerable: false,
  writeable: true
});

var config = {
  substitute: null
};

var createSubstitute = function(terms, source) {
  var pipeline = terms.map(function(term, index) {
    var tempTerm = '___' + index + '___';
    return {
      passes: [
        {
          re: new RegExp('\\b' + term + '\\b', 'g'),
          substitute: tempTerm
        },
        {
          re: new RegExp('\\b' + tempTerm + '\\b', 'g'),
          substitute: source[term]
        },
      ]
    };
  });

  return function(str) {
    return [0, 1].reduce(function(value, pass) {
      return pipeline.reduce(function(val, sub) {
        return val.replace(sub.passes[pass].re, sub.passes[pass].substitute);
      }, value);
    }, str);
  };
};

var wrapStr = function(func) {
  return function() {
    var str = func.apply(this, arguments);

    if (config.substitute) {
      str = config.substitute(str);
    }

    return str;
  };
};

var setSubstitutions = function(options) {
  config.substitute = createSubstitute(options.terms, options.source);
};

module.exports = {
  setSubstitutions: setSubstitutions,
  gettext: wrapStr(django.gettext),
  ngettext: wrapStr(django.ngettext),
  // pluralidx: django.pluralidx,
  // gettext_noop: wrapStr(django.gettext_noop),
  // pgettext: wrapStr(django.pgettext),
  // npgettext: wrapStr(django.npgettext),
  // interpolate: django.interpolate,
  // get_format: django.get_format,
  // formats: django.formats,
};
