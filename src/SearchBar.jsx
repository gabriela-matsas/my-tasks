export default function SearchBar({ value, onChange }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      background: "#f5f5f5", border: "0.5px solid #e5e5e5",
      borderRadius: 10, padding: "7px 12px", marginBottom: 16,
    }}>
      <span style={{ color: "#888", fontSize: 15 }}>🔍</span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search tasks..."
        style={{ border: "none", outline: "none", background: "transparent", fontSize: 14, color: "#1a1a1a", flex: 1, fontFamily: "'DM Sans', sans-serif" }}
      />
      {value && (
        <button onClick={() => onChange("")} style={{ border: "none", background: "none", cursor: "pointer", color: "#888", fontSize: 14, padding: 0 }}>✕</button>
      )}
    </div>
  );
}