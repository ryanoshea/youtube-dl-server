import path from "path";
import { spawn } from "child_process";

class DownloadOperations {
  private static readonly FILENAME_TEMPLATE = '%(title)s.%(ext)s';

  public constructor(
    private outputDir: string
  ) { }

  public download(url: string) {
    const isWindows = process.platform === "win32";
    const separator = isWindows ? "\\" : "/";
    let outPath = `${this.outputDir}${separator}${DownloadOperations.FILENAME_TEMPLATE}`;
    if (outPath.match(/\s/)) {
      outPath = `"${outPath}"`;
    }

    return new Promise((resolve, reject) => {
      const ls = spawn("youtube-dl", [
        "--add-metadata",
        "-i",
        `-o ${outPath}`,
        url,
      ]);

      ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
      });

      ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
      });

      ls.on("error", error => {
        console.log(`error: ${error.message}`);
      });

      ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
        if (code === 0) {
          resolve();
        } else {
          reject();
        }
      });
    })
  }
}

export default DownloadOperations;
