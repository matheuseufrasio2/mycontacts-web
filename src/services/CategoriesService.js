import { HttpClient } from './utils/HttpClient';

class CategoriesServiceLayer {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async listCategories() {
    return this.httpClient.get('categories');
  }
}

export const CategoriesService = new CategoriesServiceLayer();
