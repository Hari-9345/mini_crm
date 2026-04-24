import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import Layout from "../components/Layout"; // ✅ IMPORTANT

function Leads() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 DELETE FUNCTION
  const deleteLead = async (id) => {
    try {
      await API.delete(`/leads/${id}`);
      fetchLeads(); // refresh
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <Layout>
      <h2>Leads</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.status}</td>
              <td>
                <Link to={`/edit-lead/${lead._id}`}>
                  <button>Edit</button>
                </Link>

                {/* 🔥 DELETE BUTTON */}
                <button
                  onClick={() => deleteLead(lead._id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Leads;