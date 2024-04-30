import taskModel from '../schemas/task.schema';
import { taskType } from '../types/task.type';

class taskService {
    async create(task: taskType) {
        try {
            const newTask = await taskModel.create(task);
            return newTask;
        } catch {
            throw new Error('Error');
        }
    }

    async findAll() {
        try {
            const tasks = await taskModel.find();
            return tasks;
        } catch {
            throw new Error('Error');
        }
    }

    async findById(id: string) {
        try {
            const task = await taskModel.findById(id);
            return task;
        } catch {
            throw new Error('Error');
        }
    }

    async update(id: string, task: taskType) {
        try {
            const updatedtask = await taskModel.findByIdAndUpdate(id, task, { new: true });
            return updatedtask;
        } catch {
            throw new Error('Error');
        }
    }

    async delete(id: string) {
        try {
            await taskModel.findByIdAndDelete(id);
        } catch {
            throw new Error('Error');
        }
    }
    async findByCategory(category: string) {
        try {
            const tasks = await taskModel.find({ category });
            return tasks;
        } catch {
            throw new Error('Error');
        }
    }

    async findClosed() {
        try {
            const tasks = await taskModel.find({ status: 'closed' });
            return tasks;
        } catch {
            throw new Error('Error');
        }
    }

    async findToDo() {
        try {
            const tasks = await taskModel.find({ status: 'to do' });
            return tasks;
        } catch {
            throw new Error('Error');
        }
    }
}

export default new taskService();
