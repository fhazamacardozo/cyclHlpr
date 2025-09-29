// backend/server.js
import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import reportRoutes from './routes/reportRoutes.js';
import trainingPlanRoutes from './routes/trainingPlanRoutes.js';

const app = express();


app.use(cors());
app.use(express.json());


app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use(reportRoutes);
app.use(trainingPlanRoutes);

app.listen(config.port, () => {
    console.log(`${config.appName} running on http://localhost:${config.port}`);
});



