import axios from "axios";
import ProductDTO from "../core/products/dto/ProductDTO";
import { ProductSystem } from "../interfaces/ProductSystem";
import { StatusCode } from "./StatusCode";

const { PRODUCTS_SERVICE_HOST, PRODUCTS_SERVICE_PORT } = process.env;

export default class ProductsSystem implements ProductSystem {
  static buildProductsServiceURL() {
    return `http://${PRODUCTS_SERVICE_HOST}:${PRODUCTS_SERVICE_PORT}`;
  }

  async findById(id: number): Promise<ProductDTO | undefined> {
    const url = `${ProductsSystem.buildProductsServiceURL()}/products/${id}`;
    const response = await axios.get<ProductDTO>(url);

    if (response.status === StatusCode.NOT_FOUND) return undefined;
    if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      console.error({
        message: `Products Service - Internal Server Error while fetching product with id ${id}`,
      });
      return undefined;
    }

    return Promise.resolve(this.createProductDTO(response.data));
  }

  private createProductDTO(values: any) {
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
