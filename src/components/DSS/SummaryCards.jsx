const SummaryCards = ({ totalRevenue, totalExpense, profit }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tổng Doanh Thu */}
        <div className="p-4 bg-blue-500 text-white rounded-lg shadow">
          <h3 className="text-xl font-bold">Tổng Doanh Thu</h3>
          <p className="text-2xl">${totalRevenue.toLocaleString()}</p>
        </div>
  
        {/* Tổng Chi Phí */}
        <div className="p-4 bg-red-500 text-white rounded-lg shadow">
          <h3 className="text-xl font-bold">Tổng Chi Phí</h3>
          <p className="text-2xl">${totalExpense.toLocaleString()}</p>
        </div>
  
        {/* Lợi Nhuận */}
        <div className="p-4 bg-green-500 text-white rounded-lg shadow">
          <h3 className="text-xl font-bold">Lợi Nhuận</h3>
          <p className="text-2xl">${profit.toLocaleString()}</p>
        </div>
      </div>
    );
  };
  
  export default SummaryCards;
  