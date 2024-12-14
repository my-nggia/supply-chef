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

function Report02() {
  const [timeOption, setTimeOption] = useState("day"); 
  const [reportType, setReportType] = useState("import"); 
  const [data, setData] = useState([]); // Data from API
  const [chartData, setChartData] = useState([]); // Data for chart

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const getCurrentTimeRange = () => {
    const now = new Date();
    switch (timeOption) {
      case "day":
        return {
          start: new Date(now.setHours(0, 0, 0, 0)),
          end: new Date(now.setHours(23, 59, 59, 999)),
        };
      case "month":
        return {
          start: new Date(now.getFullYear(), now.getMonth(), 1),
          end: new Date(now.getFullYear(), now.getMonth() + 1, 0),
        };
      case "year":
        return {
          start: new Date(now.getFullYear(), 0, 1),
          end: new Date(now.getFullYear(), 11, 31),
        };
      case "quarter":
        const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
        return {
          start: new Date(now.getFullYear(), quarterStartMonth, 1),
          end: new Date(now.getFullYear(), quarterStartMonth + 3, 0),
        };
      case "hour":
        return {
          start: new Date(now.setMinutes(0, 0, 0)),
          end: new Date(now.setMinutes(59, 59, 999)),
        };
      default:
        return null;
    }
  };

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
          unit: ["kg", "box"][Math.floor(Math.random() * 2)],
          timestamp: new Date().toISOString(),
        }));

        const { start, end } = getCurrentTimeRange();
        const filteredData = fetchedData.filter((item) => {
          const itemTime = new Date(item.timestamp);
          return itemTime >= start && itemTime <= end;
        });

        setData(filteredData);
        setChartData(
          filteredData
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
    { label: "Timestamp", key: "timestamp" },
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

            {/* CSV Download */}
        <div className="mt-4 mb-4">
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Material</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Unit</th>
                  <th className="border px-4 py-2">Timestamp</th>
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
                                    <td className="border px-4 py-2 text-center">{item.timestamp}</td>
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
              
                        
                      </div>
                    </div>
                  </div>
                );
              }
              
export default Report02;
              