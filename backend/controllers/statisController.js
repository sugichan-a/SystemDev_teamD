import { sequelize } from '../models';

export async function customerStatistics(req, res) {
  try {
    const query = `
      SELECT
        c.id AS "customerId",
        c.name AS "customerName",
        COALESCE(SUM(oi.quantity * oi.price), 0) AS "totalSales",
        AVG(EXTRACT(EPOCH FROM (d.delivery_date - o.order_date))/86400) AS "averageLeadTime"
      FROM customers c
      LEFT JOIN orders o ON c.id = o.customer_id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN deliveries d ON o.id = d.order_id
      GROUP BY c.id, c.name
      ORDER BY "totalSales" DESC
      LIMIT 100
    `;

    const [results] = await sequelize.query(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics' });
  }
}

export async function customerDetail(req, res) {
  try {
    const { id } = req.params;

    const query = `
      SELECT
        c.id AS "customerId",
        c.name AS "customerName",
        COALESCE(SUM(oi.quantity * oi.price), 0) AS "totalSales",
        AVG(EXTRACT(EPOCH FROM (d.delivery_date - o.order_date))/86400) AS "averageLeadTime",
        c.contact_person AS "contactPerson",
        c.phone,
        c.address,
        c.delivery_conditions AS "deliveryConditions",
        c.registered_at AS "registeredAt",
        c.remarks
      FROM customers c
      LEFT JOIN orders o ON c.id = o.customer_id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN deliveries d ON o.id = d.order_id
      WHERE c.id = :id
      GROUP BY c.id
    `;

    const [results] = await sequelize.query(query, {
      replacements: { id },
    });

    if (results.length === 0) return res.status(404).json({ message: 'Customer not found' });

    res.json(results[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer detail' });
  }
}
