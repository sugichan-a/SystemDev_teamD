import { Order, OrderItem, Customer, User } from '../models';
import { Op } from 'sequelize';

export async function listOrders(req, res) {
  try {
    const { customerName, orderDate, status } = req.query;
    const where = {};

    if (status) where.status = status;
    if (orderDate) where.order_date = orderDate;

    const include = [{
      model: Customer,
      where: customerName ? { name: { [Op.iLike]: `%${customerName}%` } } : undefined,
      required: !!customerName
    }];

    const orders = await Order.findAll({ where, include });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
}

export async function createOrder(req, res) {
  try {
    const { customer_id, user_id, order_date, items } = req.body;

    const order = await Order.create({ customer_id, user_id, order_date, status: 'pending' });

    const orderItems = items.map(item => ({
      order_id: order.id,
      book_id: item.book_id,
      quantity: item.quantity,
      price: item.price,
      note: item.note
    }));

    await OrderItem.bulkCreate(orderItems);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
}
