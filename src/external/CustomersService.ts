import axios from "axios";
import CustomerDTO from "../core/customers/dto/CustomerDTO";
import { CustomersSource} from "../interfaces/CustomersSource";
import { StatusCode } from "./StatusCode";

const { CUSTOMERS_SERVICE_HOST, CUSTOMERS_SERVICE_PORT } = process.env;

export default class CustomersService implements CustomersSource {
  static buildCustomerServiceURL() {
    return `http://${CUSTOMERS_SERVICE_HOST}:${CUSTOMERS_SERVICE_PORT}`;
  }

  async findByCPF(cpf: string): Promise<CustomerDTO | undefined> {
    const url = `${CustomersService.buildCustomerServiceURL()}/customers/${cpf}`;
    const response = await axios.get<CustomerDTO>(url);

    if (response.status === StatusCode.NOT_FOUND) return undefined;
    if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      console.error({
        message: `Customers Service - Internal Server Error while fetching customer with CPF ${cpf}`,
      });
      return undefined;
    }

    return Promise.resolve(this.createCustomerDTO(response.data));
  }

  async findByID(id: number): Promise<CustomerDTO | undefined> {
    const url = `${CustomersService.buildCustomerServiceURL()}/customers/${id}`;
    const response = await axios.get<CustomerDTO>(url);

    if (response.status === StatusCode.NOT_FOUND) return undefined;
    if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      console.error({
        message: `Customers Service - Internal Server Error while fetching customer with ID ${id}`,
      });
      return undefined;
    }

    return Promise.resolve(this.createCustomerDTO(response.data));
  }

  private createCustomerDTO(values: any) {
    return new CustomerDTO({
      id: values.id,
      name: values.name,
      cpf: values.cpf,
    });
  }
}
