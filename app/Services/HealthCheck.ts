import express from 'express';

const HealthCheck = express();

HealthCheck.get('/', (req, res) => {
    res.send('OK');
});

export default HealthCheck;
