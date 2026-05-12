import { useState, useRef, useEffect } from "react";
import { CATEGORY_META } from "./constants";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [hovered, setHovered] = useState(false);
  const editRef = useRef();
  const meta = CATEGORY_META[task.category];

  const commitEdit = () => {
    onEdit(task.id, editText);
    setEditing(false);
  };

  useEffect(() => {
    if (editing) editRef.current?.focus();
  }, [editing]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "13px 16px", background: "#fff",
        borderRadius: 12, border: `0.5px solid ${hovered ? "#ccc" : "#e5e5e5"}`,
        marginBottom: 8, transition: "box-shadow 0.15s, border-color 0.15s",
        boxShadow: hovered ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
        opacity: task.completed ? 0.7 : 1,
      }}
    >
      <button
        onClick={() => onToggle(task.id)}
        style={{
          width: 22, height: 22, borderRadius: 7,
          border: `2px solid ${task.completed ? "#534AB7" : "#ccc"}`,
          background: task.completed ? "#534AB7" : "transparent",
          cursor: "pointer", display: "flex", alignItems: "center",
          justifyContent: "center", flexShrink: 0, transition: "all 0.15s",
        }}
      >
        {task.completed && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        {editing ? (
          <input
            ref={editRef}
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") commitEdit(); if (e.key === "Escape") { setEditText(task.text); setEditing(false); } }}
            onBlur={commitEdit}
            style={{ width: "100%", border: "none", borderBottom: "1.5px solid #534AB7", outline: "none", fontSize: 14, background: "transparent", color: "#1a1a1a", fontFamily: "'DM Sans', sans-serif", padding: "2px 0" }}
          />
        ) : (
          <span
            onDoubleClick={() => setEditing(true)}
            style={{ fontSize: 14, color: "#1a1a1a", textDecoration: task.completed ? "line-through" : "none", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", cursor: "text" }}
          >
            {task.text}
          </span>
        )}
      </div>

      <span style={{ background: meta.bg, color: meta.color, borderRadius: 20, fontSize: 11, fontWeight: 600, padding: "2px 8px", flexShrink: 0 }}>
        {meta.label}
      </span>

      <div style={{ display: "flex", gap: 4, opacity: hovered ? 1 : 0, transition: "opacity 0.15s", flexShrink: 0 }}>
        <button onClick={() => setEditing(true)} title="Edit" style={{ background: "transparent", border: "none", cursor: "pointer", color: "#888", fontSize: 15, padding: "3px 5px", borderRadius: 6 }}>✏</button>
        <button onClick={() => onDelete(task.id)} title="Delete" style={{ background: "transparent", border: "none", cursor: "pointer", color: "#D85A30", fontSize: 15, padding: "3px 5px", borderRadius: 6 }}>✕</button>
      </div>
    </div>
  );
}