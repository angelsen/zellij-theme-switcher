declare module 'gi://Gio' {
  export default class Gio {
    static Settings: typeof Settings;
    static File: {
      new_for_path(path: string): GioFile;
    };
    static FileCreateFlags: {
      REPLACE_DESTINATION: number;
    };
  }

  export class Settings {
    constructor(options: { schema_id: string });
    connect(signal: string, callback: Function): number;
    disconnect(id: number): void;
    get_string(key: string): string;
    get_boolean(key: string): boolean;
    set_string(key: string, value: string): void;
    set_boolean(key: string, value: boolean): void;
  }

  export interface GioFile {
    query_exists(cancellable: any): boolean;
    make_directory_with_parents(cancellable: any): boolean;
    load_contents(cancellable: any): [boolean, Uint8Array];
    replace_contents(contents: Uint8Array, etag: any, make_backup: boolean, flags: number, cancellable: any): boolean;
  }
}