import React, { useState } from "react";
import InventoryNavigationBar from "../Navigation Bars/InventoryNavigationBar";

function Audit() {
    const [inventory, setInventory] = useState([
        { id: 1, name: "Tomatoes", systemQuantity: 50, actualQuantity: 0, unit: "box", isMatched: false },
        { id: 2, name: "Onions", systemQuantity: 30, actualQuantity: 0, unit: "box", isMatched: false },
        { id: 3, name: "Potatoes", systemQuantity: 40, actualQuantity: 0, unit: "box", isMatched: false },
    ]);

    const handleQuantityChange = (id, value) => {
        setInventory((prev) =>
            prev.map((item) => {
                const actualQuantity = parseInt(value) || 0;
                const isMatched = actualQuantity === item.systemQuantity;
                return item.id === id ? { ...item, actualQuantity, isMatched } : item;
            })
        );
    };

    const handleMarkAsMatched = (id) => {
        setInventory((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isMatched: true, actualQuantity: item.systemQuantity } : item
            )
        );
    };

    const handleAuditSubmit = () => {
        const discrepancies = inventory.filter(
            (item) => !item.isMatched
        );

        if (discrepancies.length > 0) {
            alert(
                "Discrepancies found:\n" +
                    discrepancies
                        .map(
                            (item) =>
                                `${item.name} (${item.unit}): System (${item.systemQuantity}), Actual (${item.actualQuantity})`
                        )
                        .join("\n")
            );
        } else {
            alert("Audit completed successfully. No discrepancies found.");
        }
    };

    return (
        <div className="w-full">
            <InventoryNavigationBar />
            <div className="h-screen bg-gray-100 p-4">
                <h1 className="text-3xl font-bold">Inventory Audit</h1>

                <div className="mt-5 bg-white p-4 rounded-md shadow-md">
                    <table className="w-full text-center border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Material</th>
                                <th className="border px-4 py-2">System Quantity</th>
                                <th className="border px-4 py-2">Actual Quantity</th>
                                <th className="border px-4 py-2">Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map((item) => (
                                <tr key={item.id} className="bg-gray-50">
                                    <td className="border px-4 py-2">{item.id}</td>
                                    <td className="border px-4 py-2">{item.name}</td>
                                    <td className="border px-4 py-2">{item.systemQuantity}</td>
                                    <td className="border px-4 py-2">
                                        {item.isMatched ? (
                                            <button
                                                onClick={() => handleMarkAsMatched(item.id)}
                                                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                            >
                                                Matched
                                            </button>
                                        ) : (
                                            <input
                                                type="number"
                                                value={item.actualQuantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(item.id, e.target.value)
                                                }
                                                className="w-full p-1 border rounded"
                                            />
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">{item.unit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={handleAuditSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Submit Audit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Audit;
