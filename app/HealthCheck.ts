import express from 'express';

const HealthCheck = express();

HealthCheck.get('/healthcheck', (req, res) => {
    res.send('OK');
});

export default HealthCheck;
