declare module 'django-i18n' {
    interface ISubstitutionOptions {
      terms: string[];
      source: {};
    }
  
    export function setSubstitutions(options: ISubstitutionOptions): void;
  
    export function gettext(msgid: string): String;

    global {
        interface String {
            format(...args: any[]) : string;
        }
    }
  }
  