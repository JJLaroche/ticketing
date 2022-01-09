import express, { Request, Response, Router } from 'express';
import { body, ValidationChain, validationResult } from "express-validator";
import jwt from 'jsonwebtoken';

import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

const router: Router = express.Router();

const rules: ValidationChain[] = [
    body('email').
    isEmail().
    withMessage('Email must be valid'),
    body('password').
    trim().
    isLength({ min: 4, max: 20}).
    withMessage('Password must be between 4 and 20 charactesr')
];

router.post('/api/users/signup', rules, validateRequest, async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');      
    }

    const user = User.build({ email, password });

    await user.save();

    // Generate jwt
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    }

    res.status(201).send(user);
});

export { router as signupRouter }; 