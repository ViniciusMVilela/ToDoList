import { Router } from 'express'
import userController from './controllers/user.controller'
import taskController from './controllers/task.controller'
import categoryController from './controllers/category.controller';

const routes = Router()

routes.post('/user', userController.create);
routes.get('/users/:id', userController.findById);
routes.get('/users', userController.findAll);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.delete);
routes.post('/category', categoryController.create);
routes.get('/categorys/:id', categoryController.findById);
routes.get('/categorys/user/:userId', categoryController.findAll);
routes.put('/categorys/:id', categoryController.update);
routes.delete('/categorys/:id', categoryController.delete);
routes.post('/task', taskController.create);
routes.get('/tasks/:id', taskController.findById);
routes.get('/tasks/user/:userId', taskController.findAll);
routes.put('/tasks/:id', taskController.update);
routes.delete('/tasks/:id', taskController.delete);
routes.get('/tasks/category/:category', taskController.findByCategory);
routes.get('/tasks/close', taskController.findClosed);

export {
    routes
}