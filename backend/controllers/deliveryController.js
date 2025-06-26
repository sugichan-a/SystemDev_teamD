import { Delivery, Order } from '../models';

export async function listDeliveries(req, res) {
  try {
    const deliveries = await Delivery.findAll();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deliveries' });
  }
}

export async function createDelivery(req, res) {
  try {
    const { order_id, delivery_date, status, note } = req.body;
    const delivery = await Delivery.create({ order_id, delivery_date, status, note });
    res.status(201).json(delivery);
  } catch (error) {
    res.status(500).json({ message: 'Error creating delivery' });
  }
}
