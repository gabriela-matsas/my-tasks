import { useState } from "react";
import { useTasks } from "./useTasks";
import AddTaskForm from "./AddTaskForm";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import StatsBar from "./StatsBar";
import TaskItem from "./TaskItem";

const FILTERS = ["all", "pending", "completed"];

export default function App() {
  const { tasks, addTask, deleteTask, toggleTask, editTask, clearCompleted } = useTasks();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = tasks.filter(t => {
    const matchFilter = filter === "all" || (filter === "completed" ? t.completed : !t.completed);
    const matchSearch = !search || t.text.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    all: tasks.length,
    pending: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F5F4EF",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "40px 16px 80px",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; }
        button:active { transform: scale(0.97); }
      `}</style>

      <div style={{ width: "100%", maxWidth: 520 }}>
        <div style={{ marginBottom: 28, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
              <div style={{ width: 32, height: 32, background: "#534AB7", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 16 }}>✦</span>
              </div>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, fontWeight: 400, color: "#1a1a1a", margin: 0 }}>
                My Tasks
              </h1>
            </div>
            <p style={{ fontSize: 13, color: "#888", margin: 0, paddingLeft: 42 }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>

        <StatsBar tasks={tasks} />
        <AddTaskForm onAdd={addTask} />
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar filter={filter} setFilter={setFilter} taskCounts={counts} onClearCompleted={clearCompleted} />

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 24px", color: "#888", fontSize: 14 }}>
            {search ? "No tasks match your search." : filter === "completed" ? "No completed tasks yet." : filter === "pending" ? "All caught up! 🎉" : "Add your first task above."}
          </div>
        ) : (
          <div>
            {filtered.map(task => (
              <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <p style={{ fontSize: 11, color: "#bbb", textAlign: "center", marginTop: 20 }}>
            Double-click a task to edit it
          </p>
        )}
      </div>
    </div>
  );
}