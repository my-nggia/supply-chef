import React from 'react'
import SummaryCards from './SummaryCards';
import RevenueChart from './RevenueChart';
import ExpansionModel from './ExpansionModel';
import { data } from "./Data";

function Dashboard() {
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const totalExpense = data.reduce((sum, item) => sum + item.expense, 0);
    const profit = totalRevenue - totalExpense;
  
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
  
        {/* Summary Cards */}
        <SummaryCards totalRevenue={totalRevenue} totalExpense={totalExpense} profit={profit} />
  
        {/* Biểu đồ thống kê doanh thu và chi phí */}
        <RevenueChart data={data} />
  
        {/* Model hỗ trợ quyết định mở rộng chi nhánh */}
        <ExpansionModel data={data} />
      </div>
    );
}

export default Dashboard