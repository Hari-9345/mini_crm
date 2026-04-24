import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  // 🔄 Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ UPDATE STATUS → Completed
  const updateStatus = async (id) => {
    try {
      await API.put(`/tasks/${id}`, { status: "Completed" });
      fetchTasks();
    } catch (err) {
      alert("Failed to update");
    }
  };

  // 🗑 DELETE TASK
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <Layout>
      <h2>Tasks</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Lead</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No tasks found
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>

                {/* Show lead name safely */}
                <td>{task.lead?.name || "No Lead"}</td>

                <td>{task.status}</td>

                <td>
                  {/* Show button ONLY if not completed */}
                  {task.status !== "Completed" && (
                    <button onClick={() => updateStatus(task._id)}>
                      Mark Done
                    </button>
                  )}

                  {/* Delete button */}
                  <button
                    onClick={() => deleteTask(task._id)}
                    style={{ marginLeft: "10px", color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
}