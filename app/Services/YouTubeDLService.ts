import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { DownloadRequest, DownloadResponse } from '../Contracts/YoutubeDLService';
import DownloadOperations from '../Operations/DownloadOperations';

class YouTubeDLService {
  public static createService(outputDir: string): Express {
    const service = express();
    service.use(bodyParser.json());
    const operations = new DownloadOperations(outputDir);

    service.post<{}, DownloadResponse, DownloadRequest>(
      "/download",
      (req, res) => {
        const url = req.body.url;

        console.log(`Starting download for ${url}`)
        operations
          .download(url)
          .then(() => console.log(`Completed download for ${url}`))
          .catch(() => console.log(`Failed download for ${url}`));


        res.send({
          message: `Video queued for download: ${url}`,
        });
      }
    );

    return service;
  }
}

export default YouTubeDLService;
