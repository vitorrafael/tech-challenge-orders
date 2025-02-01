import CustomerDTO from "../core/customers/dto/CustomerDTO";
import { CustomersSystem as ICustomersSystem } from "../interfaces/CustomersSystem";

export default class CustomersSystem implements ICustomersSystem {
  async findByCPF(cpf: string): Promise<CustomerDTO | undefined> {
    return Promise.resolve(undefined);
  }

  async findByID(id: number): Promise<CustomerDTO | undefined> {
    return Promise.resolve(undefined);
  }
}
