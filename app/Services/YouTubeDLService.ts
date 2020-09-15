import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import { DownloadRequest, DownloadResponse } from '../Contracts/YoutubeDLService';
import DownloadOperations from '../Operations/DownloadOperations';
import Logger from '../Log/Logger';

class YouTubeDLService {
  public static createService(outputDir: string): Express {
    const service = express();
    service.use(bodyParser.json());
    const operations = new DownloadOperations(outputDir);

    service.post<{}, DownloadResponse, DownloadRequest>('/download', (req, res) => {
      const { url, subDir } = req.body;
      const id = uuidv4();
      const log = new Logger(id);

      log.debug(`Starting download for: ${url}`);
      operations
        .download(id, url, subDir)
        .then(() => log.debug(`Finished download for: ${url}`))
        .catch(() => log.error(`Failed download for: ${url}`));

      res.send({
        message: `Video queued for download${subDir ? ` in directory '${subDir}'` : ''} with ID ${id} - ${url}`,
      });
    });

    return service;
  }
}

export default YouTubeDLService;
