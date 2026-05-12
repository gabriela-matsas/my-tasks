import { useState, useRef } from "react";
import { CATEGORIES, CATEGORY_META } from "./constants";

export default function AddTaskForm({ onAdd }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("personal");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef();

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd(text, category);
    setText("");
    inputRef.current?.focus();
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      border: `1.5px solid ${focused ? "#534AB7" : "#e5e5e5"}`,
      padding: "16px 20px",
      marginBottom: 20,
      transition: "border-color 0.2s",
    }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 20, color: "#534AB7" }}>✦</span>
        <input
          ref={inputRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Add a new task..."
          style={{ flex: 1, border: "none", outline: "none", fontSize: 15, background: "transparent", color: "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}
        />
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          style={{
            background: text.trim() ? "#534AB7" : "#f0f0f0",
            color: text.trim() ? "#fff" : "#aaa",
            border: "none", borderRadius: 10, padding: "8px 18px",
            fontSize: 14, fontWeight: 600, cursor: text.trim() ? "pointer" : "default",
            transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Add
        </button>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {CATEGORIES.map(cat => {
          const meta = CATEGORY_META[cat];
          const active = category === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                background: active ? meta.bg : "transparent",
                color: active ? meta.color : "#888",
                border: `1px solid ${active ? meta.color + "44" : "#e5e5e5"}`,
                borderRadius: 20, padding: "3px 12px", fontSize: 12,
                fontWeight: active ? 600 : 400, cursor: "pointer",
                transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {meta.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}