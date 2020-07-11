import express from 'express';
import YouTubeDLService from './YouTubeDLService';
import HealthCheck from './HealthCheck';

const argv = process.argv.slice(2);
const PORT = argv.length > 0 ? parseInt(argv[0], 10) : 80;

const Server = express();

Server.use(HealthCheck);
Server.use(YouTubeDLService);

Server.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
