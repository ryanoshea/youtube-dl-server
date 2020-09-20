import path from 'path';
import { FILENAME_TEMPLATE } from '../Consts';

export default class DownloadConfig {
  public constructor(public outputDir: string, public subDir: string | null) {
    if (this.subDir === '' || this.subDir === 'null') {
      this.subDir = null;
    }
  }

  public getOutDir(): string {
    const pathParts = [this.outputDir, this.subDir, FILENAME_TEMPLATE].filter(part => part != null) as string[];
    return path.join(...pathParts);
  }
}
