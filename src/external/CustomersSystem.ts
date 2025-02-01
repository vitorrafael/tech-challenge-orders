import CustomerDTO from "../core/customers/dto/CustomerDTO";
import { CustomersSystem as ICustomersSystem } from "../interfaces/CustomersSystem";
import { IndexedObject } from "../interfaces/DataSources";

export default class CustomersSystem implements ICustomersSystem {
  findByProperties(
    properties: IndexedObject
  ): Promise<CustomerDTO[] | undefined> {
    return Promise.resolve(undefined);
  }
}
