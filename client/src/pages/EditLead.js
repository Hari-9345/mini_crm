import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

export default function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
  });

  // ✅ FIXED: useCallback to avoid ESLint error
  const fetchLead = useCallback(async () => {
    try {
      const res = await API.get(`/leads/${id}`);
      setLead(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  // ✅ FIXED: dependency added
  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  // Handle input change
  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  // Update lead
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/leads/${id}`, lead);
      navigate("/dashboard");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <Layout>
      <h2>Edit Lead</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={lead.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <br /><br />

        <input
          name="email"
          value={lead.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <br /><br />

        <input
          name="phone"
          value={lead.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <br /><br />

        <select
          name="status"
          value={lead.status}
          onChange={handleChange}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Lost">Lost</option>
        </select>
        <br /><br />

        <button type="submit">Update</button>
      </form>
    </Layout>
  );
}