class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async postCategory(categoryData) {
        const category = await this.categoryRepository.postCategory(categoryData);
        return category;
    }

    async getCategory(categoryId) {
        const category = await this.categoryRepository.getCategory(categoryId);
        return category;
    }

    async getCategories() {
        const category = await this.categoryRepository.getCategories();
        return category;
    }

    async updateCategory(categoryId, updatedData) {
        const updatedCategory = await this.categoryRepository.updateCategory(categoryId, updatedData);
        return updatedCategory;
    }

    async deleteCategory(categoryId) {
        const deletedCategory = await this.categoryRepository.deleteCategory(categoryId);
        return deletedCategory;
    }
}

module.exports = CategoryService;