import { NextFunction, Request, Response } from 'express';
import boom, { Boom } from '@hapi/boom';
import config from '../../config/index';

function withErrorStack(error: any, stack: string) {
  if (config.dev) {
    return { ...error, stack };
  }

  return error;
}

export function logErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(err, 'soy este');
  next(err);
}

export function wrapErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const {
    output: { statusCode, payload },
  }: Boom = err;
  res.status(statusCode).json(withErrorStack(payload, err.stack));
}
