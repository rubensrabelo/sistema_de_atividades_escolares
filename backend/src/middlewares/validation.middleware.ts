import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validationMiddleware<T extends object>(type: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(type, req.body);
    const errors = await validate(dtoObj);

    if (errors.length > 0) {
      const messages = errors
        .map(err => Object.values(err.constraints || {}))
        .flat();
      return res.status(400).json({ errors: messages });
    }

    req.body = dtoObj;
    next();
  };
}
