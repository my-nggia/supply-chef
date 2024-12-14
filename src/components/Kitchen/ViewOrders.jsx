import React, { useState, useEffect } from "react";
import KitchenNavigationBar from "../Navigation Bars/KitchenNavigationBar";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]); // List of orders
  const [chefs, setChefs] = useState(["Tien Luat", "Son Tung", "Tung Duong", "Kim Ly", "Ly Hai"]); // List of sous chefs

  // Fetch initial dummy order data
  useEffect(() => {
    const dummyOrders = [
      { id: 1, table: 5, dish: "Lẩu gà", quantity: 2, status: "Pending", assignedChef: "", startTime: null },
      { id: 2, table: 3, dish: "Lẩu bò", quantity: 1, status: "Pending", assignedChef: "", startTime: null },
      { id: 3, table: 7, dish: "Lẩu hải sản", quantity: 2, status: "Pending", assignedChef: "", startTime: null },
      { id: 4, table: 7, dish: "Cơm rang", quantity: 1, status: "Pending", assignedChef: "", startTime: null },
      { id: 5, table: 7, dish: "Súp rau củ", quantity: 5, status: "Pending", assignedChef: "", startTime: null },
      { id: 6, table: 7, dish: "Mì xào bò", quantity: 3, status: "Pending", assignedChef: "", startTime: null },
    ];
    setOrders(dummyOrders);
  }, []);

  // Handle assigning a sous chef to an order
  const handleAssignChef = (orderId, chefName) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId && order.status === "Pending") {
        return {
          ...order,
          assignedChef: chefName,
          status: "Processing",
          startTime: new Date().toLocaleTimeString(),
        };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  return (
    <>
    <KitchenNavigationBar />
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">View Customer Orders</h1>
      <table className="table-auto w-full bg-white border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Table Number</th>
            <th className="border px-4 py-2">Dish</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Assigned Chef</th>
            <th className="border px-4 py-2">Assign Chef</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className={
                order.status === "Pending" ? "bg-yellow-100" : "bg-green-100"
              }
            >
              <td className="border px-4 py-2 text-center">{order.id}</td>
              <td className="border px-4 py-2 text-center">{order.table}</td>
              <td className="border px-4 py-2 text-center">{order.dish}</td>
              <td className="border px-4 py-2 text-center">{order.quantity}</td>
              <td className="border px-4 py-2 text-center">{order.status}</td>
              <td className="border px-4 py-2 text-center">
                {order.assignedChef || "-"}
              </td>
              <td className="border px-4 py-2 text-center">
                {order.status === "Pending" && (
                  <select
                    className="p-2 border border-gray-300 rounded"
                    onChange={(e) => handleAssignChef(order.id, e.target.value)}
                    defaultValue={""}
                  >
                    <option value="" disabled>
                      Select Sous Chef
                    </option>
                    {chefs.map((chef) => (
                      <option key={chef} value={chef}>
                        {chef}
                      </option>
                    ))}
                  </select>
                )}
                {order.status === "Processing" && (
                  <span className="text-green-600 font-medium">{order.startTime}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ViewOrders;
