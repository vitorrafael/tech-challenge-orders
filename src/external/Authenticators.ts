import axios from "axios";
import CustomersSystem from "./CustomersSystem";
import ProductsSystem from "./ProductsSystem";
import { StatusCode } from "./StatusCode";

const REGEX = new RegExp(/http:\/\/[a-zA-Z]+:\d+/);

function authenticateServiceURL(url: string): boolean {
  return REGEX.test(url);
}

export async function authenticateDependenciesAvailability() {
  const productsServiceUrl = ProductsSystem.buildProductsServiceURL();
  const customersServiceUrl = CustomersSystem.buildCustomerServiceURL();

  if (
    !authenticateServiceURL(productsServiceUrl) ||
    !authenticateServiceURL(customersServiceUrl)
  )
    return false;

  const [productsResponse, customersResponse] = await Promise.all([
    axios.get(`${productsServiceUrl}/health`),
    axios.get(`${customersServiceUrl}/health`),
  ]);

  return (
    productsResponse.status === StatusCode.OK &&
    productsResponse.status === StatusCode.OK
  );
}
