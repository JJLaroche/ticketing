import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

router.post('/api/users/signout', (req: Request, res: Response) => {
    res.send('Holis')
});

export { router as signoutRouter }; 