import React, { useState, useEffect } from "react";
import InventoryNavigationBar from "../Navigation Bars/InventoryNavigationBar";

function Tracking() {
  const [shipmentType, setShipmentType] = useState("import"); // import or export
  const [statusFilter, setStatusFilter] = useState("all"); // all, in-transit, delivered, delayed
  const [shipments, setShipments] = useState([]);

  const mockShipments = [
    { id: 1, type: "import", name: "Vegetables", status: "in-transit", date: "15.12.2024" },
    { id: 2, type: "export", name: "Meat", status: "delivered", date: "12.12.2024" },
    { id: 3, type: "import", name: "Sauce", status: "delayed", date: "12.12.2024" },
    { id: 4, type: "export", name: "Rice", status: "in-transit", date: "13.12.2024" },
    { id: 5, type: "import", name: "Spices", status: "delivered", date: "14.12.2024" },
  ];

  useEffect(() => {
    const filteredShipments = mockShipments.filter((shipment) => {
      const matchesType = shipment.type === shipmentType;
      const matchesStatus = statusFilter === "all" || shipment.status === statusFilter;
      return matchesType && matchesStatus;
    });
    setShipments(filteredShipments);
  }, [shipmentType, statusFilter]);

  return (
    <div className="w-full">
      <InventoryNavigationBar />
      <div className="h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Tracking Shipments</h1>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <div className="flex justify-between">
            <div>
              <label className="block text-sm font-medium">Shipment Type:</label>
              <select
                value={shipmentType}
                onChange={(e) => setShipmentType(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="import">Import</option>
                <option value="export">Export</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All</option>
                <option value="in-transit">In-Transit</option>
                <option value="delivered">Delivered</option>
                <option value="delayed">Delayed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Shipment Details</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Material</th>
                  <th className="border px-4 py-2">Type</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {shipments.length > 0 ? (
                  shipments.map((shipment) => (
                    <tr key={shipment.id} className="even:bg-gray-50">
                      <td className="border px-4 py-2 text-center">{shipment.id}</td>
                      <td className="border px-4 py-2">{shipment.name}</td>
                      <td className="border px-4 py-2 text-center">
                        {shipment.type.charAt(0).toUpperCase() + shipment.type.slice(1)}
                      </td>
                      <td className="border px-4 py-2 text-center capitalize">{shipment.status}</td>
                      <td className="border px-4 py-2 text-center">{shipment.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No shipments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tracking;
