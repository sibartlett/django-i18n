var django = require('./django');

if (global.django && global.django.gettext) {
  django = global.django;
}

var wrapStr = function(func) {
  return function() {
    var str = new String(func.apply(this, arguments));
    str.format = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      return django.interpolate(this, args);
    };
    return str;
  };
};

module.exports = {
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
