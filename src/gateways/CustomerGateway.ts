import CustomerGatewayInterface from "../core/interfaces/CustomerGateway";
import CustomerDTO from "../core/customers/dto/CustomerDTO";
import { CustomersSource } from "../interfaces/CustomersSource";

export default class CustomerGateway implements CustomerGatewayInterface {
  constructor(private dataSource: CustomersSource) {}

  async findByCPF(cpf: string): Promise<CustomerDTO | undefined> {
    const customer = await this.dataSource.findByCPF(cpf);
    if (!customer) return undefined;
    return customer;
  }

  async findById(id: number): Promise<CustomerDTO | undefined> {
    const customer = await this.dataSource.findByID(id);
    if (!customer) return undefined;
    return customer;
  }
}
