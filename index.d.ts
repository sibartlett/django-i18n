declare module 'django-i18n' {
    interface IUiCustomizationOptions {
      terms: string[];
      source: {};
    }
  
    export function setUiCustomizations(options: IUiCustomizationOptions): void;
    
    export function gettext(msgid: string): String;
    export function gettext(msgid1: string, msgid2: string, num: Number): String;

    global {
        interface String {
            format(...args: any[]) : string;
            withoutUiCustomizations() : String;
        }
    }
  }
  