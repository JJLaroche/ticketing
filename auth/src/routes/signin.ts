import express from 'express';
import { Request, Response } from 'express';
import { body, ValidationChain, validationResult } from 'express-validator';

import { RequestValidationError } from "../errors/request-validation-error";

const router = express.Router();

const rules: ValidationChain[] = [
    body('email').
    isEmail().
    withMessage('Email must be valid'),
    body('password').
    trim().
    notEmpty().
    withMessage('Password must be between 4 and 20 charactesr')
];

router.post('/api/users/signin', rules ,  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }
    res.send('Holis')
});

export { router as signinRouter }; 