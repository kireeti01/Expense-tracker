import React from "react";
import { Link } from "react-router-dom";
import { useExpense } from "../contexts/ExpenseContext.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

function Dashboard() {
  const { transactions } = useExpense();

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const recentTransactions = transactions.slice(-5).reverse();

  const categoryData = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const chartData = Object.entries(categoryData).map(
    ([category, amount]) => ({ category, amount })
  );

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2>Dashboard</h2>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20 }}>
        <div className="card">
          <h3>Total Income</h3>
          <p>₹{totalIncome}</p>
        </div>

        <div className="card">
          <h3>Total Expenses</h3>
          <p>₹{totalExpenses}</p>
        </div>

        <div className="card">
          <h3>Balance</h3>
          <p style={{ color: balance >= 0 ? "green" : "red" }}>
            ₹{balance}
          </p>
        </div>
      </div>

      {/* Recent */}
      <div className="card" style={{ marginTop: 20 }}>
        <h3>Recent Transactions</h3>
        <ul>
          {recentTransactions.map(t => (
            <li key={t.id}>
              {t.description} – ₹{t.amount}
            </li>
          ))}
        </ul>
        <Link to="/transactions" className="btn">View All</Link>
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(350px,1fr))", gap: 20, marginTop: 20 }}>
        <div className="card">
          <h3>Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={chartData} dataKey="amount" nameKey="category" outerRadius={80}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
