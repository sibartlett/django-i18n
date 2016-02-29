var django = global.django || (global.django = {});

django.pluralidx = function (count) {
  return (count == 1) ? 0 : 1;
};

/* gettext identity library */
django.gettext = function (msgid) {
  return msgid;
};
django.ngettext = function (singular, plural, count) {
  return (count == 1) ? singular : plural;
};
django.gettext_noop = function (msgid) {
  return msgid;
};
django.pgettext = function (context, msgid) {
  return msgid;
};
django.npgettext = function (context, singular, plural, count) {
  return (count == 1) ? singular : plural;
};

django.interpolate = function (fmt, obj, named) {
  if (named) {
    return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
  } else {
    return fmt.replace(/%s/g, function(match){return String(obj.shift())});
  }
};


/* formatting library */
django.formats = {
  "DATETIME_FORMAT": "N j, Y, P",
  "DATETIME_INPUT_FORMATS": [
    "%Y-%m-%d %H:%M:%S",
    "%Y-%m-%d %H:%M:%S.%f",
    "%Y-%m-%d %H:%M",
    "%Y-%m-%d",
    "%m/%d/%Y %H:%M:%S",
    "%m/%d/%Y %H:%M:%S.%f",
    "%m/%d/%Y %H:%M",
    "%m/%d/%Y",
    "%m/%d/%y %H:%M:%S",
    "%m/%d/%y %H:%M:%S.%f",
    "%m/%d/%y %H:%M",
    "%m/%d/%y"
  ],
  "DATE_FORMAT": "N j, Y",
  "DATE_INPUT_FORMATS": [
    "%Y-%m-%d",
    "%m/%d/%Y",
    "%m/%d/%y",
    "%b %d %Y",
    "%b %d, %Y",
    "%d %b %Y",
    "%d %b, %Y",
    "%B %d %Y",
    "%B %d, %Y",
    "%d %B %Y",
    "%d %B, %Y"
  ],
  "DECIMAL_SEPARATOR": ".",
  "FIRST_DAY_OF_WEEK": "0",
  "MONTH_DAY_FORMAT": "F j",
  "NUMBER_GROUPING": "0",
  "SHORT_DATETIME_FORMAT": "m/d/Y P",
  "SHORT_DATE_FORMAT": "m/d/Y",
  "THOUSAND_SEPARATOR": ",",
  "TIME_FORMAT": "P",
  "TIME_INPUT_FORMATS": [
    "%H:%M:%S",
    "%H:%M:%S.%f",
    "%H:%M"
  ],
  "YEAR_MONTH_FORMAT": "F Y"
};
django.get_format = function (format_type) {
  var value = django.formats[format_type];
  if (typeof(value) == 'undefined') {
    return format_type;
  } else {
    return value;
  }
};

/* add to global namespace */
global.pluralidx = django.pluralidx;
global.gettext = django.gettext;
global.ngettext = django.ngettext;
global.gettext_noop = django.gettext_noop;
global.pgettext = django.pgettext;
global.npgettext = django.npgettext;
global.interpolate = django.interpolate;
global.get_format = django.get_format;
module.exports = django;
