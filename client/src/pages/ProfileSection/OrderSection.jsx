import { useAtom } from "jotai";
import { useEffect, useState, useMemo } from "react";
import { userDetailsAtom } from "../../storeAtom/Atom";
import API_URL, { APP_URL } from "../../constant/data";

const OrderStatus = ({ status }) => {
  const statusStyle = useMemo(() => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  }, [status]);

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyle}`}>
      {status}
    </span>
  );
};

const OrdersSection = () => {
  const [userDetails] = useAtom(userDetailsAtom);   

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrdersDetails = async () => {
      try {
        const response = await fetch(`${APP_URL}/api/getOrders`, {
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        const filterOrders=data && data.filter((item)=>item?.username===userDetails?.name);
       filterOrders.length==0?setOrders(data ):setOrders(filterOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getOrdersDetails();
  }, []);

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Orders</h2>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Order ID', 'Date', 'Total', 'Status'].map((header) => (
                <th key={header} className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map(({ orderId, amount, orderedTime, status }) => (
              <tr key={orderId}>
                <td className="px-4 w-[10%] md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{orderId}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(orderedTime).toLocaleString()}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{amount}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <OrderStatus status={status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersSection;
