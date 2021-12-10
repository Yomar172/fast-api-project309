import express, { Request, Response, NextFunction } from 'express';
import MoviesService from '../services/movies';
import {
  createMovieSchema,
  movieIdSchema,
  updateMovieSchema,
} from '../utils/schemas/movies';
import { validationHandler } from '../utils/middlewares/validationHandler';

export default function movies(app: express.Application): void {
  const router: express.Router = express.Router();
  const moviesService: MoviesService = new MoviesService();

  app.use('/api/movies', router);

  router.get('/', list);
  router.get('/:id', validationHandler({ id: movieIdSchema }, 'params'), get);
  router.post('/', validationHandler(createMovieSchema), add);
  router.put(
    '/:id',
    validationHandler({ id: movieIdSchema }),
    validationHandler(updateMovieSchema),
    update,
  );
  router.delete(
    '/:id',
    validationHandler({ id: movieIdSchema }, 'params'),
    remove,
  );

  async function list(req: Request, res: Response, next: NextFunction) {
    try {
      const { tags } = req.query;
      const data = await moviesService.getMovies(tags as string[]);
      res.status(200).json({ data, message: 'movies listed' });
    } catch (e) {
      next(e);
    }
  }

  async function get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await moviesService.getMovie(req.params.id);
      res.status(200).json({ data: data, message: 'movie retrieved' });
    } catch (e) {
      next(e);
    }
  }

  async function add(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await moviesService.createMovie(req.body);
      res.status(200).json({ data, message: 'movie created' });
    } catch (e) {
      next(e);
    }
  }

  async function update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await moviesService.updateMovie(req.params.id, req.body);
      res.status(200).json({ data, message: 'movie updated' });
    } catch (e) {
      next(e);
    }
  }

  async function remove(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await moviesService.deleteMovie(req.params.id);
      res.status(200).json({ data, message: 'movie deleted' });
    } catch (e) {
      next(e);
    }
  }
}
