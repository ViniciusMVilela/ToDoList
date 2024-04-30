import { Request, Response } from 'express';
import CategoryService from '../services/category.service';

class CategoryController {
    async create(req: Request, res: Response) {
        try {
            const newCategory = await CategoryService.create(req.body);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500);
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const findedCategory = await CategoryService.findById(req.params.id);
            if (!findedCategory) {
                res.status(404).json({error: "Not found category"});
            } else {
                res.status(200).json(findedCategory);
            }
        } catch (error) {
            res.status(500);
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const allCategory= await CategoryService.findAll(req.params.userId);
            res.status(200).json(allCategory);
        } catch (error) {
            res.status(500);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updateCategory = await CategoryService.update(req.params.id, req.body);
            res.status(200).json(updateCategory);
        } catch (error) {
            res.status(500);
        }
    }

    async delete(req: Request, res: Response) {
        try {
             await CategoryService.delete(req.params.id);
            res.status(200);
        } catch (error) {
            res.status(500);
        }
    }
}

export default new CategoryController();
