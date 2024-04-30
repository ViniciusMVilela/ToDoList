import categoryModel from '../schemas/category.schema';
import { categoryType } from '../types/category.types';

class categoryService {
    async create(category: categoryType) {
        try {
            const newCategory = await categoryModel.create(category);
            return newCategory;
        } catch (error) {
            throw new Error('Error');
        }
    }

    async findById(id: string) {
        try {
            const category = await categoryModel.findById(id);
            return category;
        } catch (error) {
            throw new Error('Error');
        }
    }

    async findAll(userId: string) {
        try {
            const categories = await categoryModel.find({ user: userId });
            return categories;
        } catch (error) {
            throw new Error('Error');
        }
    }

    async update(id: string, category: categoryType) {
        try {
            const updateCategory = await categoryModel.findByIdAndUpdate(id, category, { new: true });
            return updateCategory;
        } catch (error) {
            throw new Error('Error');
        }
    }

    async delete(id: string) {
        try {
            await categoryModel.findByIdAndDelete(id);
            return 'category deleted';
        } catch (error) {
            throw new Error('Error');
        }
    }
}

export default new categoryService();
