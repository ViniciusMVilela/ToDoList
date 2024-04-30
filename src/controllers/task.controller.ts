import { Request, Response } from 'express';
import taskService from '../services/task.service';

class taskController {
    async create(req: Request, res: Response) {
        try {
            const newTask = await taskService.create(req.body);
            res.status(201).json(newTask);
        } catch {
            res.status(500);
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const task = await taskService.findById(req.params.id);
            if (!task) {
                res.status(404).json({ message: 'task not found'});
            } else {
                res.status(200).json(task);
            }
        } catch {
            res.status(500);
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const tasks = await taskService.findAll();
            res.status(200).json(tasks);
        } catch {
            res.status(500);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updatedtask = await taskService.update(req.params.id, req.body);
            res.status(200).json(updatedtask);
        } catch {
            res.status(500);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await taskService.delete(req.params.id);
            res.status(200);
        } catch {
            res.status(500);
        }
    }
      
        async findByCategory(req: Request, res: Response) {
            try {
                const tasks = await taskService.findByCategory(req.params.category);
                res.status(200).json(tasks);
            } catch {
                res.status(500);
            }
        }
    
     
        async findClosed(req: Request, res: Response) {
            try {
                const tasks = await taskService.findClosed();
                res.status(200).json(tasks);
            } catch {
                res.status(500);
            }
        }  
}

export default new taskController();
