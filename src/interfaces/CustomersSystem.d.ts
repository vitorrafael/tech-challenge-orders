export interface CustomersSystem {
  findByProperties(
    properties: IndexedObject
  ): Promise<CustomerDTO[] | undefined>;
}
