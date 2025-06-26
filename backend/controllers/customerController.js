import { Customer } from '../models';
import { Op } from 'sequelize';

export async function listCustomers(req, res) {
  try {
    const { name } = req.query;
    const where = {};
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    const customers = await Customer.findAll({ where });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers' });
  }
}

export async function createCustomer(req, res) {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer' });
  }
}

export async function deleteCustomer(req, res) {
  try {
    const { id } = req.params;
    await Customer.destroy({ where: { id } });
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer' });
  }
}
