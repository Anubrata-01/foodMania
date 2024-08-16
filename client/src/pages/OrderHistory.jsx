import React from 'react';

const OrderHistory = () => {
  const orders = [
    { id: '1001', date: '2024-08-10', total: 129.99, status: 'Delivered' },
    { id: '1002', date: '2024-08-05', total: 79.50, status: 'Shipped' },
    { id: '1003', date: '2024-07-28', total: 249.99, status: 'Processing' },
    { id: '1004', date: '2024-07-15', total: 59.99, status: 'Delivered' },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Order History</h1>
      
      {/* Large screens */}
      <div className="hidden sm:block">
        <div className="bg-stone-300 shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href={`/order/${order.id}`} className="text-indigo-600 hover:text-indigo-900">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Small screens */}
      <div className="sm:hidden">
        {orders.map((order) => (
          <div key={order.id} className="bg-white shadow rounded-lg mb-4 p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Order {order.id}</span>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-2">{formatDate(order.date)}</div>
            <div className="text-sm font-medium mb-2">${order.total.toFixed(2)}</div>
            <a href={`/order/${order.id}`} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;