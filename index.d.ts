declare module 'django-i18n' {
    interface ISubstitutionOptions {
      terms: string[];
      source: {};
    }
  
    export function setSubstitutions(options: ISubstitutionOptions): void;
  
    export function gettext(msgid: string): String;
    export function gettext(msgid1: string, msgid2: string, num: Number): String;

    global {
        interface String {
            format(...args: any[]) : string;
        }
    }
  }
  