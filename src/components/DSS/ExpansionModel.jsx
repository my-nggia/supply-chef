const ExpansionModel = ({ data }) => {
    const totalStockIn = data.reduce((sum, item) => sum + item.stock_in, 0);
    const totalStockOut = data.reduce((sum, item) => sum + item.stock_out, 0);
  
    const expansionSuggestion =
      totalStockOut / totalStockIn > 0.8
        ? "Khả năng mở rộng chi nhánh là CAO. Nhu cầu tiêu thụ rất lớn."
        : "Khả năng mở rộng chi nhánh là THẤP. Nhu cầu tiêu thụ chưa ổn định.";
  
    return (
      <div className="bg-white p-4 rounded-lg shadow my-6">
        <h3 className="text-xl font-bold mb-2">Mở Rộng Chi Nhánh</h3>
        <p>
          Tỷ lệ tiêu thụ kho: <strong>{((totalStockOut / totalStockIn) * 100).toFixed(2).toLocaleString()}%</strong>
        </p>
        <p className="mt-2">{expansionSuggestion}</p>
      </div>
    );
  };
  
  export default ExpansionModel;
  