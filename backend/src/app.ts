import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { config } from './config';
import { connection } from './config/database';
import { logger } from './logging/Logger';
import accountRoutes from './routes/AccountRoutes';

const app = express();

connection();

app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use('/api/v1/account', accountRoutes);

app.listen(config.port, () => {
	logger.info(`Server is running on port ${config.port}`);
});

export default app;
