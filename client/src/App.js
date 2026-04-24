import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddLead from "./pages/AddLead";
import EditLead from "./pages/EditLead";
import Companies from "./pages/Companies";
import Tasks from "./pages/Tasks";
import Leads from "./pages/Leads"; // 🔥 ADD THIS

// 🔐 Protected Route
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* 🔥 NEW LEADS PAGE */}
        <Route
          path="/leads"
          element={
            <PrivateRoute>
              <Leads />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-lead"
          element={
            <PrivateRoute>
              <AddLead />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-lead/:id"
          element={
            <PrivateRoute>
              <EditLead />
            </PrivateRoute>
          }
        />

        <Route
          path="/companies"
          element={
            <PrivateRoute>
              <Companies />
            </PrivateRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;