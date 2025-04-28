declare module 'django-i18n' {
    interface IUiCustomizationOptions {
      terms: string[];
      source: {};
    }
  
    export function applyUiCustomizations(str: string): string;
    export function setUiCustomizations(options: IUiCustomizationOptions): void;
    
    export function gettext(msgid: string): String;
    export function ngettext(msgid1: string, msgid2: string, num: number): String;

    global {
        interface String {
            format(...args: any[]) : string;
            withoutUiCustomizations() : String;
        }
    }
  }
  