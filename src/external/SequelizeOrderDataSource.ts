import { OrderDataSource } from "../interfaces/DataSources";

import ItemDTO from "../core/orders/dto/ItemDTO";
import OrderDTO from "../core/orders/dto/OrderDTO";
import OrderModel from "../infrastructure/database/models/order";
import ItemModel from "../infrastructure/database/models/item";

export default class OrderModelDataSource implements OrderDataSource {
  async create(orderDTO: OrderDTO): Promise<OrderDTO> {
    const { status, code, customerId, paymentStatus } =
      orderDTO as Required<OrderDTO>;
    const createdOrder = await OrderModel.create({
      status,
      code,
      customerId,
      paymentStatus,
    });

    return this.createOrderDTO(createdOrder);
  }

  async findById(id: number): Promise<OrderDTO | undefined> {
    const order = await OrderModel.findByPk(id, {
      include: [
        {
          model: ItemModel,
        },
      ],
    });
    return order ? this.createOrderDTO(order) : undefined;
  }

  async findAll(): Promise<OrderDTO[]> {
    const orders = await OrderModel.findAll({
      include: [
        {
          model: ItemModel,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return orders?.length === 0 ? [] : orders.map(this.createOrderDTO);
  }

  async findOrdersByStatusAndSortByAscDate(
    status: string
  ): Promise<OrderDTO[]> {
    const orders = await OrderModel.findAll({
      include: [
        {
          model: ItemModel,
        },
      ],
      where: { status },
      order: [["createdAt", "ASC"]],
    });

    return orders?.length === 0 ? [] : orders.map(this.createOrderDTO);
  }

  async updateOrder(orderDTO: OrderDTO): Promise<OrderDTO | undefined> {
    const { id, code, status, paymentStatus } = orderDTO;

    const order = await OrderModel.findByPk(id)!;
    if (order) {
      const updatedOrder = await order.update({ code, status, paymentStatus });
      return this.findById(updatedOrder.id);
    }
  }

  async createItem(orderDTO: OrderDTO, itemDTO: ItemDTO) {
    const order = await OrderModel.findByPk(orderDTO.id);
    const {
      productId,
      productName,
      productDescription,
      quantity,
      unitPrice,
      totalPrice,
    } = itemDTO;
    await order!.createItem({
      productId: productId!,
      productName: productName!,
      productDescription: productDescription!,
      quantity: quantity!,
      unitPrice: unitPrice!,
      totalPrice: totalPrice!,
    });
    return order;
  }

  async updateItem(itemId: number, itemDTO: ItemDTO) {
    const item = await ItemModel.findByPk(itemId)!;
    if (item) await item.update(itemDTO);
  }

  async removeItem(orderId: number, itemId: number) {
    const order = await OrderModel.findByPk(orderId);
    if (order) await order.removeItem(itemId);
  }

  private createOrderDTO(databaseOrder: any) {
    return new OrderDTO({
      id: databaseOrder.id,
      createdAt: databaseOrder.createdAt,
      code: databaseOrder.code,
      status: databaseOrder.status,
      totalPrice: databaseOrder.totalPrice,
      customerId: databaseOrder.customerId,
      paymentStatus: databaseOrder.paymentStatus,
      items: databaseOrder.Items?.map(
        (databaseItem: any) =>
          new ItemDTO({
            id: databaseItem.id,
            orderId: databaseItem.OrderId,
            productId: databaseItem.productId,
            quantity: databaseItem.quantity,
            unitPrice: databaseItem.unitPrice,
            totalPrice: databaseItem.totalPrice,
            productName: databaseItem.productName,
            productDescription: databaseItem.productDescription,
          })
      ),
    });
  }
}
