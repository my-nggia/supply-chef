import React, { useState } from 'react'
import InventoryNavigationBar from '../Navigation Bars/InventoryNavigationBar';

function TrackingOrders() {
    const initialOrders = [
        { TableNo: 1, OrderNo: "001", Items: ["1 Hotpot", " 2 Spring Rolls"], Staff: "" },
        { TableNo: 2, OrderNo: "002", Items: ["Fried Rice"], Staff: "" },
        { TableNo: 3, OrderNo: "003", Items: ["Noodles", "Dim Sum"], Staff: "" },
        { TableNo: 4, OrderNo: "004", Items: ["Noodles", "Dim Sum"], Staff: "" },
        { TableNo: 5, OrderNo: "005", Items: ["Noodles", "Dim Sum"], Staff: "" },
        { TableNo: 6, OrderNo: "006", Items: ["Noodles", "Dim Sum"], Staff: "" },
        { TableNo: 7, OrderNo: "007", Items: ["Noodles", "Dim Sum"], Staff: "" },
      ];
    
      const staffOptions = ["Alice", "Bob", "Charlie"];
    
      const [pendingOrders, setPendingOrders] = useState(initialOrders);
      const [processingOrders, setProcessingOrders] = useState([]);
    
      const handleStaffSelection = (order, staff) => {
        const updatedOrder = { ...order, Staff: staff };
        setPendingOrders((prev) => prev.filter((o) => o.OrderNo !== order.OrderNo));
        setProcessingOrders((prev) => [...prev, updatedOrder]);
      };

  return (
    <>
    {/* START TRACKING  */}
    <div className='w-full'>
        <InventoryNavigationBar />

    
        <div className="flex flex-col items-center p-2 bg-gray-100 h-screen">
        {/* Bảng chờ xử lý */}
        <div className="w-full bg-white p-2 m-2 rounded-md">
            <h2 className="text-xl font-bold text-center mb-4">Pending Orders</h2>
            <table className="border-collapse border-2 border-red-600 w-full text-center">
            <thead>
                <tr className="bg-red-200">
                <th className="border-2 border-red-600 px-4 py-2">TableNo.</th>
                <th className="border-2 border-red-600 px-4 py-2">OrderNo.</th>
                <th className="border-2 border-red-600 px-4 py-2">Order</th>
                <th className="border-2 border-red-600 px-4 py-2">Staff</th>
                </tr>
            </thead>
            <tbody>
                {pendingOrders.map((order) => (
                <tr key={order.OrderNo} className="bg-red-100">
                    <td className="border-2 border-red-600 px-4 py-2">{order.TableNo}</td>
                    <td className="border-2 border-red-600 px-4 py-2">{order.OrderNo}</td>
                    <td className="border-2 border-red-600 px-4 py-2">
                    <ul className="">
                        {order.Items.map((item, index) => (
                        <li key={index}>{item}</li>
                        ))}
                    </ul>
                    </td>
                    <td className="border-2 border-red-600 px-4 py-2">
                    <select
                        className="border border-gray-300 rounded p-1"
                        onChange={(e) => handleStaffSelection(order, e.target.value)}
                        defaultValue=""
                    >
                        <option value="" disabled>
                        Select Staff
                        </option>
                        {staffOptions.map((staff) => (
                        <option key={staff} value={staff}>
                            {staff}
                        </option>
                        ))}
                    </select>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Bảng đang thực hiện */}
        <div className="w-full bg-white p-2 m-2 rounded-md">
            <h2 className="text-xl font-bold text-center mb-4">Processing Orders</h2>
            <table className="border-collapse border-2 border-yellow-600 w-full text-center">
            <thead>
                <tr className="bg-yellow-200">
                <th className="border-2 border-yellow-600 px-4 py-2">TableNo.</th>
                <th className="border-2 border-yellow-600 px-4 py-2">OrderNo.</th>
                <th className="border-2 border-yellow-600 px-4 py-2">Order</th>
                <th className="border-2 border-yellow-600 px-4 py-2">Staff</th>
                </tr>
            </thead>
            <tbody>
                {processingOrders.map((order) => (
                <tr key={order.OrderNo} className="bg-yellow-100">
                    <td className="border-2 border-yellow-600 px-4 py-2">{order.TableNo}</td>
                    <td className="border-2 border-yellow-600 px-4 py-2">{order.OrderNo}</td>
                    <td className="border-2 border-yellow-600 px-4 py-2">
                    <ul className="">
                        {order.Items.map((item, index) => (
                        <li key={index}>{item}</li>
                        ))}
                    </ul>
                    </td>
                    <td className="border-2 border-yellow-600 px-4 py-2">{order.Staff}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
        {/* END. */}
    </div>
  </>
  )
}

export default TrackingOrders