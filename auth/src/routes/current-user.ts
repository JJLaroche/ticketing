import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req: Request, res: Response) => {
    res.send('Holis')
});

export { router as currentUserRouter }; 