import express from 'express';

const YouTubeDLService = express();

YouTubeDLService.get('/healthcheck', (req, res) => {
    res.send('OK');
});

export default YouTubeDLService;
