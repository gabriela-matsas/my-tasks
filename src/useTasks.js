import { useState, useEffect } from "react";

const genId = () => Math.random().toString(36).slice(2, 9);

const defaultTasks = [
  { id: genId(), text: "Review project documentation", completed: false, category: "work", createdAt: Date.now() - 86400000 },
  { id: genId(), text: "Morning workout routine", completed: true, category: "health", createdAt: Date.now() - 43200000 },
  { id: genId(), text: "Read 30 pages of a book", completed: false, category: "study", createdAt: Date.now() - 3600000 },
];

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("taskmanager_tasks");
      return saved ? JSON.parse(saved) : defaultTasks;
    } catch {
      return defaultTasks;
    }
  });

  useEffect(() => {
    localStorage.setItem("taskmanager_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, category) => {
    if (!text.trim()) return;
    setTasks(prev => [{ id: genId(), text: text.trim(), completed: false, category, createdAt: Date.now() }, ...prev]);
  };

  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));
  const toggleTask = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const editTask = (id, newText) => {
    if (!newText.trim()) return;
    setTasks(prev => prev.map(t => t.id === id ? { ...t, text: newText.trim() } : t));
  };
  const clearCompleted = () => setTasks(prev => prev.filter(t => !t.completed));

  return { tasks, addTask, deleteTask, toggleTask, editTask, clearCompleted };
}