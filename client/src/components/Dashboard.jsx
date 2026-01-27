import "./Dashboard.css";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Dashboard() {
  const pieData = {
    labels: ["Food", "Transport", "Shopping", "Other"],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#f44336"]
      }
    ]
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Expenses",
        data: [300, 450, 350, 500, 600],
        backgroundColor: "#2196f3"
      }
    ]
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Expense Tracker</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Records</li>
          <li>Reports</li>
          <li>Accounting</li>
        </ul>
      </aside>

      <main className="main">
        <header className="navbar">
          <h3>Welcome, John!</h3>
        </header>

        <section className="cards">
          <div className="card green">
            <p>Total Income</p>
            <h2>$3,500</h2>
          </div>
          <div className="card red">
            <p>Total Expense</p>
            <h2>$1,200</h2>
          </div>
          <div className="card blue">
            <p>Current Balance</p>
            <h2>$2,300</h2>
          </div>
        </section>

        <section className="content">
          <div className="transactions">
            <h3>Recent Transactions</h3>
            <ul>
              <li>Groceries <span>$200</span></li>
              <li>Salary <span>$1200</span></li>
              <li>Rent <span>$1000</span></li>
              <li>Dining Out <span>$100</span></li>
            </ul>
          </div>

          <div className="charts">
            <div className="chart">
              <h3>Expense Breakdown</h3>
              <Pie data={pieData} />
            </div>
            <div className="chart">
              <Bar data={barData} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
