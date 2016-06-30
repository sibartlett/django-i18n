var django = require('./django');

if (global.django && global.django.gettext) {
  django = global.django;
}

var config = {
  substitute: null
};

var createSubstitute = function(terms, source) {
  var pipeline = terms.map(function(term) {
    var pattern = '\\b' + term + '\\b';
    return {
      pattern: pattern,
      re: new RegExp(pattern),
      term: term,
      substitute: source[term]
    };
  });

  return function(str) {
    return pipeline.reduce(function(value, sub) {
      return value.replace(sub.re, sub.substitute);
    }, str);
  };
};

var wrapStr = function(func) {
  return function() {
    var src = func.apply(this, arguments);

    if (config.substitute) {
      src = config.substitute(src);
    }

    var str = new String(src);
    str.format = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      return django.interpolate(this, args);
    };
    return str;
  };
};

var setSubstitutions = function(options) {
  config.substitute = createSubstitute(options.terms, options.source);
};

module.exports = {
  setSubstitutions: setSubstitutions,
  pluralidx: django.pluralidx,
  gettext: wrapStr(django.gettext),
  ngettext: wrapStr(django.ngettext),
  gettext_noop: wrapStr(django.gettext_noop),
  pgettext: wrapStr(django.pgettext),
  npgettext: wrapStr(django.npgettext),
  interpolate: django.interpolate,
  get_format: django.get_format,
  formats: django.formats
};
