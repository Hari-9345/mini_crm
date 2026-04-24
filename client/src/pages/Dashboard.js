import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    qualifiedLeads: 0,
    tasksDueToday: 0,
    completedTasks: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await API.get("/dashboard");
    setStats(res.data);
  };

  return (
    <Layout>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: 20 }}>
        <div>
          <h3>Total Leads</h3>
          <p>{stats.totalLeads}</p>
        </div>

        <div>
          <h3>Qualified Leads</h3>
          <p>{stats.qualifiedLeads}</p>
        </div>

        <div>
          <h3>Tasks Due Today</h3>
          <p>{stats.tasksDueToday}</p>
        </div>

        <div>
          <h3>Completed Tasks</h3>
          <p>{stats.completedTasks}</p>
        </div>
      </div>
    </Layout>
  );
}