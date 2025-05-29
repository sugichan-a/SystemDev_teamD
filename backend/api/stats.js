import express from 'express';

const router = express.Router();

const deliveries = [
  {
    id: 1,
    orderId: 1,
    totalAmount: 10000,
    orderDate: '2025-05-01',
    deliveryDate: '2025-05-04'
  },
  {
    id: 2,
    orderId: 2,
    totalAmount: 20000,
    orderDate: '2025-05-02',
    deliveryDate: '2025-05-06'
  },
  {
    id: 3,
    orderId: 3,
    totalAmount: 15000,
    orderDate: '2025-05-03',
    deliveryDate: '2025-05-03'
  }
];

router.get('/', (req, res) => {
  const totalRevenue = deliveries.reduce((sum, d) => sum + d.totalAmount, 0);

  const totalDays = deliveries.reduce((sum, d) => {
    const orderDate = new Date(d.orderDate);
    const deliveryDate = new Date(d.deliveryDate);
    const leadTime = (deliveryDate - orderDate) / (1000 * 60 * 60 * 24); // 日数
    return sum + leadTime;
  }, 0);

  const averageLeadTime = deliveries.length > 0
    ? (totalDays / deliveries.length).toFixed(2)
    : 0;

  res.json({
    totalRevenue,
    averageLeadTime
  });
});

export default router;
