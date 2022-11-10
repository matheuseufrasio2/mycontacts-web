class CategoryMapperLayer {
  toDomain(persistenceCategory) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    };
  }
}

export const CategoryMapper = new CategoryMapperLayer();
