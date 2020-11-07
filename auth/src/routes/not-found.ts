import express from 'express';
import { NotFounError } from "../errors/not-found-error";

const router = express.Router();

router.all('*', async (req, res, next) => {
    throw new NotFounError();
    
});

export { router as notfoundRouter }; 