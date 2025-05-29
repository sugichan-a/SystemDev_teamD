import React from "react";

function OrderTable({ orders, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {["Order Number", "Customer", "Date", "Status", "Notes", "Actions"].map((header) => (
              <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-roboto">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap font-roboto">{order.orderNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap font-roboto">{order.customer}</td>
              <td className="px-6 py-4 whitespace-nowrap font-roboto">{order.date}</td>
              <td className="px-6 py-4 whitespace-nowrap font-roboto">{order.status}</td>
              <td className="px-6 py-4 whitespace-nowrap font-roboto">{order.notes}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-800 mr-3">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="text-red-600 hover:text-red-800" onClick={() => onDelete(order.id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
