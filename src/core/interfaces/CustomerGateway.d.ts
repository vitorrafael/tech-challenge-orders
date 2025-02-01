export default interface CustomerGateway {
  findByCPF(cpf: string): Promise<CustomerDTO | undefined>;
  findById(id: number): Promise<CustomerDTO | undefined>;
}
