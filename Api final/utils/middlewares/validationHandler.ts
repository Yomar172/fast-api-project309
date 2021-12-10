import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';
import joi from '@hapi/joi';
import { errorHandler } from './errorHandler';

function validate(data: object, schema: object) {
  const { error } = joi.object(schema).validate(data);
  return error?.message;
}

export function validationHandler(schema: object, check: string = 'body') {
  return function (req: Request, res: Response, next: NextFunction) {
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error)) : next();
  };
}
