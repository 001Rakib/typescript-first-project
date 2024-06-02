import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interface/error';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import config from '../config';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
/* eslint-disable @typescript-eslint/no-unused-vars */

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  {
    //setting default values
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';

    let errorSources: TErrorSources = [
      {
        path: '',
        message: 'Something went wrong',
      },
    ];

    if (err instanceof ZodError) {
      const simplifiedZodError = handleZodError(err);
      statusCode = simplifiedZodError?.statusCode;
      message = simplifiedZodError?.message;
      errorSources = simplifiedZodError?.errorSources;
    } else if (err?.name === 'ValidationError') {
      const simplifiedValidationError = handleValidationError(err);
      statusCode = simplifiedValidationError.statusCode;
      message = simplifiedValidationError.message;
      errorSources = simplifiedValidationError.errorSources;
    } else if (err?.name === 'CastError') {
      const simplifiedCastError = handleCastError(err);
      statusCode = simplifiedCastError.statusCode;
      message = simplifiedCastError.message;
      errorSources = simplifiedCastError.errorSources;
    } else if (err?.code === 11000) {
      const simplifiedCastError = handleDuplicateError(err);
      statusCode = simplifiedCastError.statusCode;
      message = simplifiedCastError.message;
      errorSources = simplifiedCastError.errorSources;
    }

    //ultimate return
    return res.status(statusCode).json({
      success: false,
      message,
      errorSources,
      stack: config.node_env === 'Development' ? err.stack : null,
    });
  }
};
export default globalErrorHandler;
