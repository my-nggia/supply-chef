import React, { useState } from 'react'
import InventorySideBar from '../Navigation Bars/InventorySideBar'

const warehouseData = [
  { id: 1, name: "Zone A", status: "green", items: [] },
  { id: 2, name: "Zone B", status: "yellow", items: ["Cải thảo", "Rau muống"] },
  { id: 3, name: "Zone C", status: "red", items: ["Cà chua", "Khóm"] },
  { id: 4, name: "Zone D", status: "green", items: [] },
  { id: 5, name: "Zone E", status: "yellow", items: ["Nấm hương", "Nấm kim châm"] },
  { id: 6, name: "Zone F", status: "red", items: ["Thịt gà", "Xương heo"] },
  { id: 7, name: "Zone G", status: "yellow", items: ["Bắp cải", "Rau ngót"] },
  { id: 8, name: "Zone H", status: "green", items: [] },
  { id: 9, name: "Zone I", status: "green", items: [] },
];

const Inventory = () => {
  const [hoveredZone, setHoveredZone] = useState(null);

  return (
    <>
        <div className='w-full bg-white flex'>
          {/* navigation bar */}
          <InventorySideBar/>

          {/* Content */}
          <div className="flex flex-wrap p-4 bg-gray-100 min-h-screen w-full items-center justify-center">
          {warehouseData.map((zone) => (
            <div
              key={zone.id}
              className="relative group w-1/4 h-32 m-2 rounded-lg"
            >
              {/* Ô khu vực */}
              <div
                className={`h-full rounded-lg flex items-center justify-center text-white font-bold ${
                  zone.status === "green"
                    ? "bg-green-400"
                    : zone.status === "yellow"
                    ? "bg-yellow-300"
                    : "bg-red-500"
                }`}
                onMouseEnter={() => setHoveredZone(zone)}
                onMouseLeave={() => setHoveredZone(null)}
              >
                {zone.name}
              </div>

              {/* Danh sách hiển thị khi hover */}
              {hoveredZone?.id === zone.id && zone.items.length > 0 && (
                <div
                  className={`absolute left-full top-0 ml-2 p-3 w-48 shadow-lg border rounded-lg text-white font-semibold z-05 ${
                    zone.status === "green"
                      ? "bg-green-400"
                      : zone.status === "yellow"
                      ? "bg-yellow-100 text-black"
                      : "bg-red-400 text-black"
                  }`}
                >
                  <h4 className="font-bold mb-2">
                    {zone.name}
                  </h4>
                  <ul>
                    {hoveredZone.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
          
      </div>
        
    </>
  )
}

export default Inventory