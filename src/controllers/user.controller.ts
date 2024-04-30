import { Request, Response } from 'express';
import userService from '../services/user.service';

class userController {
    async create(req: Request, res: Response) {
        try {
            const createdUser = await userService.create(req.body);
            res.status(201).json(createdUser);
        } catch {
            res.status(500);
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const findedUser = await userService.findById(req.params.id);
            res.status(200).json(findedUser);
        } catch {
            res.status(500);
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const findedUsers = await userService.findAll();
            res.status(200).json(findedUsers);
        } catch {
            res.status(500);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updateduser = await userService.update(req.params.id, req.body);
            res.status(200).json(updateduser);
        } catch {
            res.status(500);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const deleted = await userService.delete(req.params.id);
            res.status(200).json(deleted);
        } catch {
            res.status(500);
        }
    }
}

export default new userController();
