export default class Logger {
  private prefixes: string[];

  public constructor(...prefixes: string[]) {
    this.prefixes = prefixes;
  }

  public child(...subPrefixes: string[]) {
    return new Logger(...this.prefixes, ...subPrefixes);
  }

  public debug(msg: string) {
    console.log(this.getLogString(msg));
  }

  public warn(msg: string) {
    console.warn(this.getLogString(msg));
  }

  public error(msg: string) {
    console.error(this.getLogString(msg));
  }

  private get prefixStr() {
    return this.prefixes.map(prefix => `[${prefix}]`).join(' ');
  }

  private getLogString(msg: string) {
    return `${this.prefixStr} ${msg}`;
  }
}
