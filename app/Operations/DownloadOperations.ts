import DownloadConfig from '../Models/DownloadConfig';
import Logger from '../Log/Logger';
import ChildProcess from '../Process/ChildProcess';

class DownloadOperations {
  private log = new Logger('ops');

  public constructor(private outputDir: string) {}

  public download(id: string, url: string, subDir: string) {
    const log = this.log.child(id, 'youtube-dl');

    const outPath = new DownloadConfig(this.outputDir, subDir).getOutDir();

    return new Promise((resolve, reject) => {
      const cmd = 'youtube-dl';
      const args = ['--add-metadata', '-i', '-o', outPath, url];

      new ChildProcess(cmd, args)
        .onStart(pid => log.debug(`Executing command: $ ${cmd} ${args.join(' ')} with PID ${pid}`))
        .onStdOut(data => log.debug(`${data}`))
        .onStdErr(data => log.error(`Error: ${data}`))
        .onClose((code, signal) => {
          log.debug(`Child process exited with code ${code} and ${signal}`);
          if (code === 0) {
            resolve();
          } else {
            reject();
          }
        })
        .execute();
    });
  }
}

export default DownloadOperations;
