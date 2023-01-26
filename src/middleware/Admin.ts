import { Request, Response } from 'express';

export function Admin (req: Request, res: Response, next) {
    if (req.body.admin) {
        next();
    } else {
        res.status(403).json({
            status: "Fail",
            message: "non autorisé",
        });
    }
}
