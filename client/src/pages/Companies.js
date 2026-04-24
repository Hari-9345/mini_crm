import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Companies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await API.get("/companies");
      setCompanies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <h2>Companies</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
  {companies && companies.length > 0 ? (
    companies
      .filter(c => c && c.name && c._id) // 🔥 strict filter
      .map((company) => (
        <tr key={company._id}>
          <td>{company.name}</td>
          <td>{company.industry || "-"}</td>
          <td>{company.location || "-"}</td>
        </tr>
      ))
  ) : (
    <tr>
      <td colSpan="3" style={{ textAlign: "center" }}>
        No companies found
      </td>
    </tr>
  )}
</tbody>
      </table>
    </Layout>
  );
}