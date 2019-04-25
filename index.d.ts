declare module 'django-i18n' {
  type TCreateSubstituteRtnFunc = (str: string) => string;
  interface ISSOptions {
    terms: string[];
    source: {};
  }

  export function createSubstitute(
    terms: string[],
    source: {}
  ): TCreateSubstituteRtnFunc;

  export function setSubstitutions(options: ISSOptions): string | void;

  type pluralidx = (count: number) => number;
  type gettext = (msgid: string) => string;
  type ngettext = (singular: string, plural: string, count: number) => string;
  type gettext_noop = (msgid: string) => string;
  type pgettext = (context: {}, msgid: string) => string;
  type npgettext = (
    context: {},
    singular: string,
    plural: string,
    count: number
  ) => string;
  type interpolate = (fmt: string, obj: {}, named: boolean) => string;
  type get_format = (format_type: string) => string | string[];

  export interface IFormats {
    [id: string]: string | string[];
  }

  global {
    interface Window {
      django: {
        pluralidx: pluralidx;
        gettext: gettext;
        ngettext: ngettext;
        gettext_noop: gettext_noop;
        pgettext: pgettext;
        npgettext: npgettext;
        interpolate: interpolate;
        get_format: get_format;
        inflected_terms: string[];
        UI_STRS: {};
        context: {
          [id: string]: any;
        };
        user: {};
      };
    }
  }
}
