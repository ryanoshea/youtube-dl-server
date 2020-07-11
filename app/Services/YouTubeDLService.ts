import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import { DownloadRequest, DownloadResponse } from '../Contracts/YoutubeDLService';
import DownloadOperations from '../Operations/DownloadOperations';

class YouTubeDLService {
  public static createService(outputDir: string): Express {
    const service = express();
    service.use(bodyParser.json());
    const operations = new DownloadOperations(outputDir);

    service.post<{}, DownloadResponse, DownloadRequest>('/download', (req, res) => {
      const url = req.body.url;
      const id = uuidv4();

      console.log(`[${id}] Starting download for: ${url}`);
      operations
        .download(id, url)
        .then(() => console.log(`[${id}] Finished download for: ${url}`))
        .catch(() => console.log(`[${id}] Failed download for: ${url}`));

      res.send({
        message: `Video queued for download ${id} - ${url}`,
      });
    });

    return service;
  }
}

export default YouTubeDLService;
