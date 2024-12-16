import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const RevenueChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow my-6">
      <h3 className="text-xl font-bold mb-4">Xu Hướng Doanh Thu và Chi Phí</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Doanh Thu" />
          <Line type="monotone" dataKey="expense" stroke="#82ca9d" name="Chi Phí" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
