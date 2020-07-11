import express from 'express';
import YouTubeDLService from './Services/YouTubeDLService';
import HealthCheck from './Services/HealthCheck';

const argv = process.argv.slice(2);

if (argv.length === 0) {
  console.log('At least one argument is required: please provide an output directory.');
  process.exit(1);
}

const outputDir = argv[0];
const port = argv.length > 1 ? parseInt(argv[1], 10) : 80;

const Server = express();

Server.use('/health', HealthCheck);
Server.use('/youtube', YouTubeDLService.createService(outputDir));

Server.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
