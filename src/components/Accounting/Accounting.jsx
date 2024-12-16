import React, { useState, useEffect } from "react";

function Accounting() {
  const [receipts, setReceipts] = useState([]); 
  const [filteredReceipts, setFilteredReceipts] = useState([]); 
  const [supplierFilter, setSupplierFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); 
  const [dateFilter, setDateFilter] = useState("all"); 


  const fetchReceiptsData = () => {
    const mockData = [
      {
        id: 1,
        supplier: "Binh Dien",
        employee: "Nguyễn Văn A",
        date: "2024-12-01",
        products: [
          { name: "Cà Chua", quantity: 100, unitPrice: 25000 },
          { name: "Hành Tây", quantity: 200, unitPrice: 22000 },

        ],
        totalAmount: 16500000,
        status: "unpaid",
      },
      {
        id: 2,
        supplier: "Coop Mart",
        employee: "Trần Thị B",
        date: "2024-12-08",
        products: [
          { name: "Bò viên", quantity: 50, unitPrice: 280000},
          { name: "Cá viên", quantity: 50, unitPrice: 300000 },
          { name: "Đậu hũ phô mai", quantity: 50, unitPrice: 60000 },

        ],
        totalAmount: 13000000,
        status: "paid",
      },
      {
        id: 3,
        supplier: "CP Food",
        employee: "Trần Thị B",
        date: "2024-12-16",
        products: [
          { name: "Ba chỉ bò", quantity: 50, unitPrice: 280000},
          { name: "Bắp bò", quantity: 50, unitPrice: 280000},
          { name: "Thịt đùi cừu", quantity: 50, unitPrice: 280000},
          { name: "Ba chỉ heo", quantity: 50, unitPrice: 280000},
          { name: "Ba chỉ heo", quantity: 50, unitPrice: 280000},

        ],
        totalAmount: 32000000,
        status: "paid",
      },
    ];
    // Reset dữ liệu trước khi fetch
    setReceipts((prev) => {
        if (prev.length === 0) {
        return mockData; 
        }
        return prev; 
  });

  setFilteredReceipts(mockData); 
    
  };

  useEffect(() => {
    let updatedReceipts = receipts;

    // Lọc theo nhà cung cấp
    if (supplierFilter) {
      updatedReceipts = updatedReceipts.filter((r) =>
        r.supplier.toLowerCase().includes(supplierFilter.toLowerCase())
      );
    }

    // Lọc trạng thái thanh toán
    if (statusFilter !== "all") {
      updatedReceipts = updatedReceipts.filter((r) => r.status === statusFilter);
    }

    // Lọc thời gian
    const today = new Date();
    updatedReceipts = updatedReceipts.filter((r) => {
      const receiptDate = new Date(r.date);
      switch (dateFilter) {
        case "today":
          return receiptDate.toDateString() === today.toDateString();
        case "week":
          const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
          return receiptDate >= startOfWeek;
        case "month":
          return (
            receiptDate.getMonth() === today.getMonth() &&
            receiptDate.getFullYear() === today.getFullYear()
          );
        case "year":
          return receiptDate.getFullYear() === today.getFullYear();
        default:
          return true;
      }
    });

    setFilteredReceipts(updatedReceipts);
  }, [supplierFilter, statusFilter, dateFilter, receipts]);

  return (
    <div className="w-full">
      {/* <InventoryNavigationBar /> */}
      <div className="h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Quản Lý Hóa Đơn Nhập Kho</h1>

        {/* Bộ lọc */}
        <div className="bg-white p-4 rounded-md shadow-md mb-6 flex gap-4 items-center">
          <input
            type="text"
            placeholder="Lọc theo nhà cung cấp..."
            value={supplierFilter}
            onChange={(e) => setSupplierFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="all">Tất cả</option>
            <option value="paid">Đã thanh toán</option>
            <option value="unpaid">Chưa thanh toán</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="all">Tất cả thời gian</option>
            <option value="today">Hôm nay</option>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="year">Năm này</option>
          </select>
          <button
            onClick={fetchReceiptsData}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Fetch
          </button>
        </div>

        {/* Bảng hóa đơn */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">ID</th>
                <th className="p-2">Nhà Cung Cấp</th>
                <th className="p-2">Nhân Viên Nhập Kho</th>
                <th className="p-2">Ngày</th>
                <th className="p-2">Sản Phẩm</th>
                <th className="p-2">Tổng Tiền</th>
                <th className="p-2">Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              {filteredReceipts.length > 0 ? (
                filteredReceipts.map((receipt) => (
                  <tr key={receipt.id} className="text-center border-b">
                    <td className="p-2">{receipt.id}</td>
                    <td className="p-2">{receipt.supplier}</td>
                    <td className="p-2">{receipt.employee}</td>
                    <td className="p-2">{receipt.date}</td>
                    <td className="p-2">
                      <ul className="list-disc text-left pl-5">
                        {receipt.products.map((product, index) => (
                          <li key={index}>
                            {product.name}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-2">{receipt.totalAmount.toLocaleString()} VND</td>
                    <td className="p-2">
                      {receipt.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    Không có dữ liệu nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Accounting;
