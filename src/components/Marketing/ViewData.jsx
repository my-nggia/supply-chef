import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import InventoryNavigationBar from "../Navigation Bars/InventoryNavigationBar";

import { CSVLink } from "react-csv";

function ViewData() {
  const [forecastData, setForecastData] = useState([]);
  const [topSellingData, setTopSellingData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [currentHour, setCurrentHour] = useState(0);

  useEffect(() => {
    getForecastData();
    getTopSellingData();
    getStockData();
  }, []);

  // Giả lập dữ liệu dự báo
  const getForecastData = () => {
    const now = new Date();
    const currentHour = now.getHours();
    setCurrentHour(currentHour);

    const mockForecastData = [
      { dish: "Lẩu Cà Chua", quantity: 25 },
      { dish: "Cơm Rang", quantity: 49 },
      { dish: "Thịt Cừu", quantity: 100 },
      { dish: "Gà Quay", quantity: 30 },
      { dish: "Bò Nướng", quantity: 12 },
    ];
    setForecastData(mockForecastData);
  };

  // Giả lập dữ liệu món ăn bán chạy
  const getTopSellingData = () => {
    const mockTopSellingData = [
      { dish: "Cơm Rang", sales: 150 },
      { dish: "Gà Quay", sales: 120 },
      { dish: "Lẩu Cà Chua", sales: 100 },
      { dish: "Bò Nướng", sales: 80 },
    ];
    setTopSellingData(mockTopSellingData);
  };

  // Giả lập dữ liệu nhập/xuất kho
  const getStockData = () => {
    const mockStockData = [
      { ingredient: "Cà Chua", imported: 500, exported: 300 },
      { ingredient: "Gạo", imported: 600, exported: 450 },
      { ingredient: "Thịt Cừu", imported: 300, exported: 200 },
    ];
    setStockData(mockStockData);
  };

  // CSV headers
  const forecastHeaders = [
    { label: "Món Ăn", key: "dish" },
    { label: "Số Lượng Dự Báo", key: "quantity" },
  ];
  const topSellingHeaders = [
    { label: "Món Ăn", key: "dish" },
    { label: "Số Lượng Bán", key: "sales" },
  ];
  const stockHeaders = [
    { label: "Nguyên Liệu", key: "ingredient" },
    { label: "Nhập Kho", key: "imported" },
    { label: "Xuất Kho", key: "exported" },
  ];

  return (
    <div className="w-full">
      {/* <InventoryNavigationBar /> */}
      <div className="h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Báo Cáo Dự Báo & Thống Kê</h1>

        {/* Biểu đồ dự báo */}
        <div className="bg-white p-4 rounded-md shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Dự báo cho khung giờ {currentHour + 1}:00 - {currentHour + 2}:00
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dish" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <CSVLink data={forecastData} headers={forecastHeaders} filename="forecast_report.csv">
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Xuất Báo Cáo Dự Báo (CSV)
            </button>
          </CSVLink>
        </div>

        {/* Biểu đồ món bán chạy */}
        <div className="bg-white p-4 rounded-md shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">Món Ăn Bán Chạy Nhất</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSellingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dish" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
          <CSVLink data={topSellingData} headers={topSellingHeaders} filename="top_selling_report.csv">
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Xuất Báo Cáo Bán Chạy (CSV)
            </button>
          </CSVLink>
        </div>

        {/* Bảng thống kê nguyên liệu */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Thống Kê Nguyên Liệu Nhập/Xuất Kho</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Nguyên Liệu</th>
                <th className="border p-2">Nhập Kho</th>
                <th className="border p-2">Xuất Kho</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.ingredient}</td>
                  <td className="border p-2">{item.imported} kg</td>
                  <td className="border p-2">{item.exported} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
          <CSVLink data={stockData} headers={stockHeaders} filename="stock_report.csv">
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Xuất Báo Cáo Kho (CSV)
            </button>
          </CSVLink>
        </div>
      </div>
    </div>
  );
}

export default ViewData;
