export interface ProductSystem {
  findById(id: number): Promise<ProductDTO | undefined>;
}
