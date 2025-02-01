import CustomerGatewayInterface from "../core/interfaces/CustomerGateway";
import CustomerDTO from "../core/customers/dto/CustomerDTO";
import { CustomersSystem } from "../interfaces/CustomersSystem";

export default class CustomerGateway implements CustomerGatewayInterface {
  constructor(private dataSource: CustomersSystem) {}

  async findByCPF(cpf: string): Promise<CustomerDTO | undefined> {
    const customer = await this.dataSource.findByProperties({ cpf });
    if (!customer) return undefined;
    return customer[0];
  }

  async findById(id: number): Promise<CustomerDTO | undefined> {
    const customer = await this.dataSource.findByProperties({ id });
    if (!customer) return undefined;
    return customer[0];
  }
}
