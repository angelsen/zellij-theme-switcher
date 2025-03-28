declare module 'gi://GLib' {
  export default class GLib {
    static build_filenamev(components: string[]): string;
    static get_home_dir(): string;
    static spawn_command_line_async(command_line: string): boolean;
  }
}