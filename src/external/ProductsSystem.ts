import ProductDTO from "../core/products/dto/ProductDTO";
import { ProductSystem } from "../interfaces/ProductSystem";

export default class ProductModelDataSource implements ProductSystem {
  async findById(id: number): Promise<ProductDTO | undefined> {
    return Promise.resolve(undefined);
  }

  #createProductDTO(values: any) {
    return new ProductDTO({
      id: values.id,
      name: values.name,
      category: values.category,
      description: values.description,
      price: values.price,
      images: values.images,
    });
  }
}
