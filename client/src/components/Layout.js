import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "200px", padding: "20px", background: "#eee" }}>
        <h3>Dashboard</h3>

        <p><Link to="/leads">Leads</Link></p>        {/* ✅ FIXED */}
        <p><Link to="/add-lead">Add Lead</Link></p>
        <p><Link to="/companies">Companies</Link></p>
        <p><Link to="/tasks">Tasks</Link></p>

        <p>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;