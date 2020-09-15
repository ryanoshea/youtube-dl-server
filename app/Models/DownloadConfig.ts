import path from 'path';
import { FILENAME_TEMPLATE } from '../Consts';

export default class DownloadConfig {
  public constructor(public outputDir: string, public subDir: string) {}

  public getOutDir(): string {
    const pathParts = [this.outputDir, this.subDir, FILENAME_TEMPLATE].filter(part => part != null);
    return path.join(...pathParts);
  }
}
