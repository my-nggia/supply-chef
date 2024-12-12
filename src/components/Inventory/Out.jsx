import React, { useState } from "react";
import InventoryNavigationBar from "../Navigation Bars/InventoryNavigationBar";
import { BsReceiptCutoff } from "react-icons/bs";

function Out() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", quantity: "", unit: "Unit" });
  const [datetime, setDatetime] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const staffName = "John Doe"; // Tên của nhân viên khu vực bếp, không thể thay đổi
  const units = ["Unit", "Thùng", "Kg", "Liter"];

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.quantity) {
      setProducts((prev) => [...prev, newProduct]);
      setNewProduct({ name: "", quantity: "", unit: "Unit" });
    }
  };

  const handleSaveReceipt = () => {
    if (products.length === 0 || !datetime) {
      alert("Please add products and date before saving.");
      return;
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const confirmSave = () => {
    console.log("Order saved:", { staffName, datetime, products });
    alert("Kitchen order has been saved successfully!");
    setShowPopup(false);
    setProducts([]);
    setDatetime("");
  };

  return (
    <>
      <div className="w-full">
        <InventoryNavigationBar />
        <div className="h-screen bg-gray-100 p-2">
          <h1 className="text-3xl font-bold">Kitchen Order</h1>
          <div className="p-2 m-2 mt-5 bg-white rounded-md shadow-md">
            <div>
              <div className="flex items-center">
                <span className="text-2xl mx-2 text-yellow-500">
                  <BsReceiptCutoff />
                </span>
                <h2 className="font-bold text-lg">OUT-IV-2212-0001</h2>
              </div>
              <div>
                <div className="mt-5 p-2 flex items-center">
                  {/* Staff Name (Fixed) */}
                  <div className="w-1/2 mx-5">
                    <label htmlFor="staff" className="block mb-2 text-sm font-medium text-gray-900">
                      Required by
                    </label>
                    <input
                      type="text"
                      id="staff"
                      value={staffName}
                      disabled
                      className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                  {/* Datetime */}
                  <div className="w-1/2">
                    <label htmlFor="receive_date" className="block mb-2 text-sm font-medium text-gray-900">
                      Datetime
                    </label>
                    <input
                      type="datetime-local"
                      id="receive_date"
                      value={datetime}
                      onChange={(e) => setDatetime(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                </div>

                <div className="flex p-2 items-center justify-between mx-5">
                  <div className="w-1/3 mr-5">
                    <label htmlFor="Product_Name" className="block mb-2 text-sm font-medium text-gray-900">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>

                  <div className="w-1/4 mr-5">
                    <label htmlFor="Quantity" className="block mb-2 text-sm font-medium text-gray-900">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>

                  <div className="w-1/4 mr-5">
                    <label htmlFor="Unit" className="block mb-2 text-sm font-medium text-gray-900">
                      Unit
                    </label>
                    <select
                      value={newProduct.unit}
                      onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      {units.map((unit, index) => (
                        <option key={index} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-1/5 mt-5">
                    <button onClick={handleAddProduct} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Add Product
                    </button>
                  </div>

                  <div className="w-1/5 mt-5">
                    <button onClick={handleSaveReceipt} className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    Save Order
                    </button>
                </div>

                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <table className="border-collapse border-1 w-2/3 text-center">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border-2 px-4 py-2">No.</th>
                  <th className="border-2 px-4 py-2">Product Name</th>
                  <th className="border-2 px-4 py-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="bg-gray-100">
                    <td className="border-2 px-4 py-2">{index + 1}</td>
                    <td className="border-2 px-4 py-2">{product.name}</td>
                    <td className="border-2 px-4 py-2">
                      {product.quantity} {product.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-3">Review Receipt</h2>
            <p>
              <strong>Required by:</strong> {staffName}
            </p>
            <p>
              <strong>Warehouse Staff:</strong> Knaflic
            </p>
            <p>
              <strong>Datetime:</strong> {datetime}
            </p>
            <h3 className="font-bold mt-3">Products:</h3>
            <ul className="list-disc pl-5">
              {products.map((product, index) => (
                <li key={index}>
                  {product.name} - {product.quantity} {product.unit}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex justify-end">
              <button onClick={closePopup} className="mr-3 p-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                Cancel
              </button>
              <button onClick={confirmSave} className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Out;
