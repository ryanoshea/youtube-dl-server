import { spawn } from 'child_process';

class DownloadOperations {
  private static readonly FILENAME_TEMPLATE = '%(title)s.%(ext)s';

  public constructor(private outputDir: string) {}

  public download(id: string, url: string) {
    const logPrefix = `[${id}] [youtube-dl] `;
    const isWindows = process.platform === 'win32';
    const separator = isWindows ? '\\' : '/';
    let outPath = `${this.outputDir}${separator}${DownloadOperations.FILENAME_TEMPLATE}`;

    return new Promise((resolve, reject) => {
      const cmd = 'youtube-dl';
      const args = ['--add-metadata', '-i', '-o', outPath, url];
      console.log(`${logPrefix}Executing command: $ ${cmd} ${args.join(' ')}`);

      const ls = spawn(cmd, args);

      ls.stdout.on('data', data => {
        console.log(`${logPrefix}${data}`);
      });

      ls.stderr.on('data', data => {
        console.log(`${logPrefix}ERR: ${data}`);
      });

      ls.on('error', error => {
        console.log(`${logPrefix}ERR: ${error.message}`);
      });

      ls.on('close', code => {
        console.log(`${logPrefix}Child process exited with code ${code}`);
        if (code === 0) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }
}

export default DownloadOperations;
