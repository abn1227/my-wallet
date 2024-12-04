/* eslint-disable @typescript-eslint/no-explicit-any */
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const validateDto = (dtoClass: any) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const dtoObj = plainToClass(dtoClass, req.body);
		const errors = await validate(dtoObj);

		if (errors.length > 0) {
			const errorMessages = errors.map(error => ({
				property: error.property,
				constraints: error.constraints,
			}));

			return res.status(400).json({ errors: errorMessages });
		}

		req.body = dtoObj;
		next();
	};
};
