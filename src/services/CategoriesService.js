import { CategoryMapper } from './mappers/CategoryMapper ';
import { HttpClient } from './utils/HttpClient';

class CategoriesServiceLayer {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async listCategories() {
    const categories = await this.httpClient.get('/categories');

    return categories.map(CategoryMapper.toDomain);
  }
}

export const CategoriesService = new CategoriesServiceLayer();
