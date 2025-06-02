import React from "react";

function OrderTable({ orders, onDelete, onEdit, onCheck, checkedItems }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3">
              <input
                type="checkbox"
                onChange={onCheck.all}
                checked={orders.length > 0 && orders.every((o) => checkedItems.includes(o.id))}
              />
            </th>
            {["Order Number", "Customer", "Date", "Status", "Notes", "Actions"].map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={checkedItems.includes(order.id)}
                  onChange={() => onCheck.item(order.id)}
                />
              </td>
              <td className="px-4 py-2 whitespace-nowrap">{order.orderNumber}</td>
              <td className="px-4 py-2 whitespace-nowrap">{order.customer}</td>
              <td className="px-4 py-2 whitespace-nowrap">{order.date}</td>
              <td className="px-4 py-2 whitespace-nowrap">{order.status}</td>
              <td className="px-4 py-2 whitespace-nowrap">{order.notes}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <button
                  className="text-blue-600 hover:text-blue-800 mr-3"
                  onClick={() => onEdit(order.id)}
                >
                  編集
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => onDelete(order.id)}
                >
                  削除
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
