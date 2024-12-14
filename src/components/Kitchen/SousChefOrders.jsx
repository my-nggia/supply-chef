import React, { useState, useEffect } from "react";
import InventoryNavigationBar from "../Navigation Bars/InventoryNavigationBar";
import KitchenNavigationBar from "../Navigation Bars/KitchenNavigationBar";

function SousChefOrders() {
  const [orders, setOrders] = useState([]); 

  useEffect(() => {
    fetchAssignedOrders();
  }, []);

  const fetchAssignedOrders = async () => {
    try {
      const response = [
        { id: 1, table: "5", dish: "Lẩu gà", quantity: 2, status: "Processing", assignedAt: "2024-06-14T09:00:00Z" },
        { id: 2, table: "3", dish: "Lẩu bò", quantity: 1, status: "Processing", assignedAt: "2024-06-14T09:00:01Z" },
        { id: 3, table: "8", dish: "Lẩu hải sản", quantity: 3, status: "Processing", assignedAt: "2024-06-14T09:10:00Z" },
      ];

      // Sắp xếp Order theo thời gian được giao
      const sortedOrders = response.sort(
        (a, b) => new Date(a.assignedAt) - new Date(b.assignedAt)
      );

      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const markAsCompleted = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    // alert(`Order #${id} đã được đánh dấu hoàn thành!`);
  };

  return (
    <div className="w-full">
      <KitchenNavigationBar />
      <div className="h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Danh sách món ăn</h1>

        {/* Table Order */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {/* <th className="border px-4 py-2 text-center">ID</th> */}
                <th className="border px-4 py-2 text-center">Số Bàn</th>
                <th className="border px-4 py-2 text-center">Món Ăn</th>
                <th className="border px-4 py-2 text-center">Số Lượng</th>
                <th className="border px-4 py-2 text-center">Thời Gian Nhận</th>
                <th className="border px-4 py-2 text-center">Trạng Thái</th>
                <th className="border px-4 py-2 text-center">Hoàn thành</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="even:bg-gray-50">
                    {/* <td className="border px-4 py-2 text-center">{order.id}</td> */}
                    <td className="border px-4 py-2 text-center">{order.table}</td>
                    <td className="border px-4 py-2 text-center">{order.dish}</td>
                    <td className="border px-4 py-2 text-center">{order.quantity}</td>
                    <td className="border px-4 py-2 text-center">
                      {new Date(order.assignedAt).toLocaleTimeString()}
                      
                    </td>
                    <td className="border px-4 py-2 text-center">{order.status}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => markAsCompleted(order.id)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-green-600"
                      >
                        Complete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="border px-4 py-2 text-center text-gray-500"
                  >
                    Không có order nào đang chờ xử lý.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SousChefOrders;
