import express from 'express';
import movies from './routes/movies';
import { validationHandler } from './utils/middlewares/validationHandler';
import {
  errorHandler,
  logErrors,
  wrapErrors,
} from './utils/middlewares/errorHandler';
import { notFoundHandler } from './utils/middlewares/notFoundHandler';
import config from './config/index';

const app: express.Application = express();

app.use(express.json());

// Routes
movies(app);

// Catch 404
app.use(notFoundHandler);

// Error Midlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => console.log('Server on port ' + config.port));
