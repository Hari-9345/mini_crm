import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function AddLead() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New"
  });

  const submit = async (e) => {
    e.preventDefault();

    console.log("SUBMIT CLICKED"); // 🔥 debug

    try {
      const res = await API.post("/leads", form);

      console.log("RESPONSE:", res.data);

      alert("Lead created!");

      window.location.href = "/dashboard";
    } catch (err) {
      console.error("ERROR:", err);
      alert("Failed to create lead");
    }
  };

  return (
    <Layout>
      <h2>Add Lead</h2>

      {/* 🔥 IMPORTANT: form must have onSubmit */}
      <form onSubmit={submit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <br /><br />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <br /><br />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />
        <br /><br />

        {/* 🔥 MUST be type="submit" */}
        <button type="submit">Save</button>
      </form>
    </Layout>
  );
}