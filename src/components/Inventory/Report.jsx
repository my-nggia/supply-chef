import React, { useState, useEffect } from "react";
import InventoryNavigationBar from "../Navigation Bars/InventoryNavigationBar";
import { CSVLink } from "react-csv";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Report() {
  const [timeOption, setTimeOption] = useState("day"); // Options: day, month, year, quarter, hour
  const [reportType, setReportType] = useState("import"); // Options: import or export
  const [data, setData] = useState([]); // Data from API
  const [chartData, setChartData] = useState([]); // Data for chart

  // Fetch data from API
  const handleFetchData = async () => {
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
      const result = await response.json();
      if (result && result.meals) {
        const fetchedData = result.meals.slice(0, 50).map((item, index) => ({
          id: index + 1,
          material: item.strIngredient,
          quantity: Math.floor(Math.random() * 100) + 1,
          unit: ["kg", "g", "liters", "ml", "pcs"][Math.floor(Math.random() * 5)],
          time: `${timeOption} ${index + 1}`,
        }));
        setData(fetchedData);
        setChartData(
          fetchedData
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5) // Top 5 materials
        );
      } else {
        setData([]);
        setChartData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setChartData([]);
    }
  };

  // CSV headers and data
  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Material", key: "material" },
    { label: "Quantity", key: "quantity" },
    { label: "Unit", key: "unit" },
    { label: "Time", key: "time" },
  ];

  return (
    <div className="w-full">
      <InventoryNavigationBar />
      <div className="h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Inventory Report</h1>
        {/* Filter Section */}
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <div className="flex justify-between">
            <div>
              <label className="block text-sm font-medium">Report Type:</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="import">Imported Materials</option>
                <option value="export">Exported Materials</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Time Option:</label>
              <select
                value={timeOption}
                onChange={(e) => setTimeOption(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="day">Day</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
                <option value="quarter">Quarter</option>
                <option value="hour">Hour</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleFetchData}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Fetch Data
              </button>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-2">
            {reportType === "import" ? "Top Imported Materials" : "Top Exported Materials"}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="material" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="quantity"
                fill={reportType === "import" ? "#8884d8" : "#82ca9d"}
                name={reportType === "import" ? "Imported Quantity" : "Exported Quantity"}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table Section */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            {reportType === "import" ? "Top Imported Materials" : "Top Exported Materials"}
          </h2>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Material</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Unit</th>
                  <th className="border px-4 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.id} className="even:bg-gray-50">
                      <td className="border px-4 py-2 text-center">{item.id}</td>
                      <td className="border px-4 py-2">{item.material}</td>
                      <td className="border px-4 py-2 text-center">{item.quantity}</td>
                      <td className="border px-4 py-2 text-center">{item.unit}</td>
                      <td className="border px-4 py-2 text-center">{item.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No data available. Please fetch the report.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* CSV Download */}
          <div className="mt-4">
            {data.length > 0 && (
              <CSVLink
                data={data}
                headers={csvHeaders}
                filename={`report_${reportType}_${timeOption}.csv`}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Download CSV
              </CSVLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
