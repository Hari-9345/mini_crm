import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

export default function EditLead() {
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New"
  });

  useEffect(() => {
    fetchLead();
  }, []);

  const fetchLead = async () => {
    const res = await API.get("/leads");
    const lead = res.data.find((l) => l._id === id);
    if (lead) setForm(lead);
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/leads/${id}`, form);
      alert("Updated successfully");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <Layout>
      <h2>Edit Lead</h2>

      <form onSubmit={submit}>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br /><br />

        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br /><br />

        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <br /><br />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
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