import React, { useState } from "react";
import InventoryNavigationBar from "../Navigation Bars/InventoryNavigationBar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

function Forecast() {
    // Sample data for forecast by material
    const materials = [
        { name: "Tomatoes", unit: "kg", data: [
            { time: "6 AM", demand: 20 },
            { time: "7 AM", demand: 25 },
            { time: "8 AM", demand: 30 },
            { time: "9 AM", demand: 50 },
            { time: "10 AM", demand: 60 },
            { time: "11 AM", demand: 80 },
            { time: "12 PM", demand: 90 },
            { time: "1 PM", demand: 70 },
            { time: "2 PM", demand: 40 },
            { time: "3 PM", demand: 35 },
            { time: "4 PM", demand: 30 },
            { time: "5 PM", demand: 40 },
            { time: "6 PM", demand: 80 },
            { time: "7 PM", demand: 100 },
            { time: "8 PM", demand: 90 },
            { time: "9 PM", demand: 70 },
            { time: "10 PM", demand: 40 },

        ] },
        { name: "Soup Base", unit: "liters", data: [
            { time: "6 AM", demand: 10 },
            { time: "7 AM", demand: 15 },
            { time: "8 AM", demand: 20 },
            { time: "9 AM", demand: 20 },
            { time: "10 AM", demand: 40 },
            { time: "11 AM", demand: 60 },
            { time: "12 PM", demand: 70 },
            { time: "1 PM", demand: 30 },
            { time: "2 PM", demand: 20 },
            { time: "3 PM", demand: 15 },
            { time: "4 PM", demand: 10 },
            { time: "5 PM", demand: 34 },
            { time: "6 PM", demand: 50 },
            { time: "7 PM", demand: 60 },
            { time: "8 PM", demand: 70 },
            { time: "9 PM", demand: 70 },
            { time: "10 PM", demand: 80 },

        ] },
        { name: "Soy Sauce", unit: "units", data: [
            { time: "6 AM", demand: 3 },
            { time: "7 AM", demand: 5 },
            { time: "8 AM", demand: 5 },
            { time: "9 AM", demand: 6 },
            { time: "10 AM", demand: 12 },
            { time: "11 AM", demand: 20 },
            { time: "12 PM", demand: 25 },
            { time: "1 PM", demand: 25 },
            { time: "2 PM", demand: 15 },
            { time: "3 PM", demand: 8 },
            { time: "4 PM", demand: 12 },
            { time: "5 PM", demand: 17 },
            { time: "6 PM", demand: 36 },
            { time: "7 PM", demand: 45 },
            { time: "8 PM", demand: 53 },
            { time: "9 PM", demand: 46 },
            { time: "10 PM", demand: 40 },
        ] },
    ];

    // Group-level data
    const groupData = [
        { group: "Fresh Produce", demand: 300 },
        { group: "Liquids", demand: 200 },
        { group: "Packaged Goods", demand: 400 },
        { group: "Frozen Foods", demand: 150 },
        { group: "Dry Ingredients", demand: 250 },
    ];

    // Percentage view data
    const percentageData = [
        { time: "6 AM", percentage: 10 },
        { time: "9 AM", percentage: 30 },
        { time: "12 PM", percentage: 40 },
        { time: "6 PM", percentage: 60 },
        { time: "8 PM", percentage: 90 },
        { time: "10 PM", percentage: 65 },
    ];

    const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);

    return (
        <div className="w-full">
            <InventoryNavigationBar />
            <div className="h-screen bg-gray-100 p-4">
                <h1 className="text-3xl font-bold mb-4">View Forecast</h1>

                <div className="bg-white p-4 rounded-md shadow-md mb-4">
                    <h2 className="text-xl font-semibold mb-4">Dự Báo Nhu Cầu Theo Giờ</h2>
                    <div className="mb-4">
                        <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-2">
                            Select Material
                        </label>
                        <select
                            id="material"
                            value={selectedMaterial.name}
                            onChange={(e) => setSelectedMaterial(materials.find(m => m.name === e.target.value))}
                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            {materials.map((material) => (
                                <option key={material.name} value={material.name}>
                                    {material.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={selectedMaterial.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="demand" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* <div className="bg-white p-4 rounded-md shadow-md mb-4">
                    <h2 className="text-xl font-semibold mb-4">Demand by Group</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={groupData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="group" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="demand" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div> */}

                    <div className="bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Tổng nhu cầu của các nhóm nguyên liệu trong ngày</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={groupData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="group" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="demand" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">Chú Thích</h3>
                        <ul className="list-disc ml-6">
                            <li><span className="text-[#82ca9d]"></span> Fresh Produce: Rau củ, hoa quả tươi</li>
                            <li><span className="text-[#82ca9d]"></span> Liquids: Chất lỏng</li>
                            <li><span className="text-[#82ca9d]"></span> Packaged Goods: Hàng đóng gói</li>
                            <li><span className="text-[#82ca9d]"></span> Frozen Foods: Thực phẩm đông lạnh</li>
                            <li><span className="text-[#82ca9d]"></span> Dry Ingredients: Nguyên liệu khô</li>
                        </ul>
                    </div>
                </div>

                
            </div>
        </div>
    );
}

export default Forecast;