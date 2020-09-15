import { spawn } from 'child_process';

export default class ChildProcess {
  private startCallback?: (pid: number) => void;
  private stdOutCallback?: (data: string) => void;
  private stdErrCallback?: (data: string) => void;
  private closeCallback?: (exitCode: number, signal: NodeJS.Signals) => void;

  public constructor(private cmd: string, private args: string[]) {}

  public onStart(cb: (pid: number) => void): ChildProcess {
    this.startCallback = cb;
    return this;
  }

  public onStdOut(cb: (data: string) => void): ChildProcess {
    this.stdOutCallback = cb;
    return this;
  }

  public onStdErr(cb: (data: string) => void): ChildProcess {
    this.stdErrCallback = cb;
    return this;
  }

  public onClose(cb: (exitCode: number, signal: NodeJS.Signals) => void): ChildProcess {
    this.closeCallback = cb;
    return this;
  }

  public execute(): number {
    const proc = spawn(this.cmd, this.args);

    if (this.startCallback != null) {
      this.startCallback(proc.pid);
    }
    if (this.stdOutCallback != null) {
      proc.stdout.on('data', this.stdOutCallback!);
    }
    if (this.stdErrCallback != null) {
      proc.stderr.on('error', this.stdErrCallback!);
    }
    if (this.closeCallback != null) {
      proc.on('close', this.closeCallback!);
    }

    return proc.pid;
  }
}
