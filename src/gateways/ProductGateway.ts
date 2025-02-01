import ProductGatewayInterface from "../core/interfaces/ProductGateway";
import ProductDTO from "../core/products/dto/ProductDTO";
import { ProductSystem } from "../interfaces/ProductSystem";

export default class ProductGateway implements ProductGatewayInterface {
  constructor(private dataSource: ProductSystem) {}
 
  async getByProductId(id: number): Promise<ProductDTO | undefined> {
    const product = await this.dataSource.findById(id);
    if (!product) return undefined;
    return product;
  }
}
