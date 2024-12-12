import React, { useState } from "react";
import InventoryNavigationBar from "../Navigation Bars/InventoryNavigationBar";

function Purchase() {
  const units = ["Unit", "Thùng", "Kg", "Liter"]; // Đơn vị

  const [materialName, setMaterialName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Unit");
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Xử lý thêm nguyên vật liệu vào danh sách
  const handleAddToCart = () => {
    if (materialName && quantity) {
      setCart((prevCart) => [
        ...prevCart,
        { material: materialName, quantity, unit },
      ]);
      setMaterialName("");
      setQuantity("");
      setUnit("Unit");
    } else {
      alert("Please enter a material name and quantity.");
    }
  };

  // Xử lý mở popup xác nhận
  const handleConfirmPurchase = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add materials before confirming.");
      return;
    }
    setShowPopup(true);
  };

  // Xử lý đóng popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Xử lý hoàn tất mua nguyên vật liệu
  const handleCompletePurchase = () => {
    console.log("Materials purchased:", cart);
    alert("Purchase completed successfully!");
    setCart([]);
    setShowPopup(false);
  };

  return (
    <>
    <InventoryNavigationBar />
    <div className="w-full h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-5">Purchasing Materials</h1>

      <div className="bg-white p-5 rounded-md shadow-md mb-5">
        <h2 className="text-xl font-semibold mb-4">Choose Materials</h2>
        <div className="flex items-center gap-4">
          
          <div className="w-1/3">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Material Name
            </label>
            <input
              type="text"
              placeholder="E.g Tomato"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          
          <div className="w-1/3">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              placeholder="E.g 1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          
          <div className="w-1/3">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              {units.map((unitOption, index) => (
                <option key={index} value={unitOption}>
                  {unitOption}
                </option>
              ))}
            </select>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddToCart}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-5"
          >
            Add
          </button>
        </div>
      </div>

      {/* Danh sách nguyên vật liệu đã chọn */}
      <div className="bg-white p-5 rounded-md shadow-md mb-5">
        <h2 className="text-xl font-semibold mb-4">Selected Materials</h2>
        {cart.length === 0 ? (
          <p>No materials added yet.</p>
        ) : (
          <table className="w-full border-collapse border text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">No.</th>
                <th className="border px-4 py-2">Material</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Unit</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="bg-gray-100">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.material}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">{item.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirm Button */}
      <div className="flex justify-end">
        <button
          onClick={handleConfirmPurchase}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Confirm Purchase
        </button>
      </div>

      {/* Popup Review */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Review Your Purchase</h2>
            <ul className="list-disc pl-5">
              {cart.map((item, index) => (
                <li key={index}>
                  {item.material} - {item.quantity} {item.unit}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex justify-end">
              <button
                onClick={handleClosePopup}
                className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-3"
              >
                Cancel
              </button>
              <button
                onClick={handleCompletePurchase}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Purchase;