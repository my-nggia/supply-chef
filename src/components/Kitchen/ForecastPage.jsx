import React, { useState, useEffect } from "react";
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
import InventoryNavigationBar from "../Navigation Bars/InventoryNavigationBar";
import KitchenNavigationBar from "../Navigation Bars/KitchenNavigationBar";

function ForecastPage() {
  const [forecastData, setForecastData] = useState([]); // Dữ liệu dự báo
  const [currentHour, setCurrentHour] = useState(0); // Lưu khung giờ hiện tại
  const [searchQuery, setSearchQuery] = useState(""); // Tìm kiếm món ăn
  const [maxServings, setMaxServings] = useState(null); // Kết quả dự đoán suất tối đa
  const [lowStockDishes, setLowStockDishes] = useState([]); // Món ăn thiếu nguyên liệu

  useEffect(() => {
    getForecastData();
  checkLowStockDishes();
    
  }, []);

  const getForecastData = async () => {
    try {
      // Giả lập dữ liệu dự báo từ API
      const now = new Date();
      const currentHour = now.getHours();
      setCurrentHour(currentHour);

      const mockData = [
        { dish: "Lẩu Cà Chua", quantity: 75 },
        { dish: "Cơm Rang", quantity: 49 },
        { dish: "Thịt Cừu", quantity: 100 },
        { dish: "Gà Quay", quantity: 30 },
        { dish: "Bò Nướng", quantity: 12 }, // Món số lượng thấp
      ];

      setForecastData(mockData);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  

  const calculateMaxServings = () => {
    // Giả lập dữ liệu ngày trong kho và công thức món ăn
    const ingredientsInStock = {
      "Cà Chua": 10, // kg
      "Gạo": 20, // kg
      "Thịt Cừu": 30, // kg
      "Gà": 15, // kg
      "Bò": 5, // kg
    };

    const recipe = {
      "Lẩu cà chua": { "Cà Chua": 0.5, "Thịt Cừu": 1 },
      "Cơm rang": { "Gạo": 0.3, "Gà": 0.2 },
      "Bò nướng": { "Bò": 1 },
    };

    // Tính toán số suất tối đa
    if (searchQuery && recipe[searchQuery]) {
      const ingredientsNeeded = recipe[searchQuery];
      let maxServings = Infinity;
      for (const ingredient in ingredientsNeeded) {
        if (ingredientsInStock[ingredient]) {
          maxServings = Math.min(
            maxServings,
            Math.floor(ingredientsInStock[ingredient] / ingredientsNeeded[ingredient])
          );
        } else {
          maxServings = 0; // Nguyên liệu không đủ
        }
      }
      setMaxServings(maxServings);
    } else {
      setMaxServings(null);
    }
  };

  const checkLowStockDishes = () => {
    const ingredientsInStock = {
      "Cà Chua": 4, // Thiếu nguyên liệu
      "Gạo": 1, // kg (Thiếu nguyên liệu)
      "Thịt Cừu": 2, // kg
      "Gà": 0.1, // kg (Thiếu nguyên liệu)
      "Bò": 0.5, // kg
    };
  
    const recipe = {
      "Lẩu Cà Chua": { "Cà Chua": 0.5, "Thịt Cừu": 1 },
      "Cơm Rang": { "Gạo": 0.3, "Gà": 0.2 },
      "Bò Nướng": { "Bò": 1 },
    };
  
    const lowStockDishesList = [];
  
    for (const dish in recipe) {
      const ingredientsNeeded = recipe[dish];
      let canServe = true;
  
      for (const ingredient in ingredientsNeeded) {
        const stock = ingredientsInStock[ingredient] || 0;
        const required = ingredientsNeeded[ingredient];
  
        if (stock < required) {
          console.log(
            `Nguyên liệu thiếu cho món ${dish}: ${ingredient} (Cần: ${required}, Có: ${stock})`
          );
          canServe = false;
          break;
        }
      }
  
      if (!canServe) {
        lowStockDishesList.push(dish);
      }
    }
    setLowStockDishes(lowStockDishesList);
  };
  return (
    <>
    <div className="w-full">
      <KitchenNavigationBar />
      <div className="h-screen bg-gray-100 p-4">
        
        {/* Tính toán dự đoán số suất */}
        <div className="bg-white p-4 rounded-md shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">Dự đoán số suất cho món ăn</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Nhập tên món ăn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={calculateMaxServings}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Dự đoán
            </button>
          </div>
          {maxServings !== null && (
            <p className="mt-4 text-lg font-medium">
              Số suất tối đa cho món "{searchQuery}": <strong>{maxServings}</strong> suất
            </p>
          )}
        </div>

        {/* Danh sách món cần bổ sung nguyên liệu */}
        <div className="bg-white p-4 rounded-md shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">Danh sách món cần bổ sung nguyên liệu</h2>
          {lowStockDishes.length > 0 ? (
            <ul className="list-disc pl-5">
              {lowStockDishes.map((dish, index) => (
                <li key={index} className="text-red-500 font-medium">
                  {dish}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-green-500">Tất cả món ăn đều có đủ nguyên liệu.</p>
          )}
        </div>

        {/* Biểu đồ dự báo */}
        <div className="bg-white p-4 rounded-md shadow-md mb-6">
        <p className="text-lg mb-6">
          Dự báo cho khung giờ <strong>{currentHour + 1}:00 - {currentHour + 2}:00</strong>
        </p>
        <div className="">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={forecastData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="dish"
                label={{ value: "Món ăn", position: "insideBottom", dy: 10 }}
              />
              <YAxis label={{ value: "Số Suất", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#8884d8" name="Số lượng dự báo" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>
        
      </div>
    </div>
    </>
  );
  
}

export default ForecastPage;
