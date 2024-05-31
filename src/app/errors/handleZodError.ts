import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import { TErrorSources } from '../interface/error';

const handleZodError = (error: ZodError) => {
  const statusCode = 400;

  const errorSources: TErrorSources = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode,
    message: 'Validation error',
    errorSources,
    stack: config.node_env === 'Development' ? error.stack : null,
  };
};
export default handleZodError;
