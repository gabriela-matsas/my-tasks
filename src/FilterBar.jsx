const FILTERS = ["all", "pending", "completed"];

export default function FilterBar({ filter, setFilter, taskCounts, onClearCompleted }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
      <div style={{ display: "flex", background: "#f0f0f0", borderRadius: 12, padding: 4, gap: 2, flex: 1 }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              flex: 1, background: filter === f ? "#fff" : "transparent",
              border: filter === f ? "0.5px solid #ddd" : "none",
              borderRadius: 9, padding: "6px 12px", fontSize: 13,
              fontWeight: filter === f ? 600 : 400,
              color: filter === f ? "#1a1a1a" : "#888",
              cursor: "pointer", transition: "all 0.15s",
              fontFamily: "'DM Sans', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            {f === "all" ? "All" : f === "pending" ? "Pending" : "Done"}
            <span style={{
              background: filter === f ? "#534AB7" : "#ddd",
              color: filter === f ? "#fff" : "#888",
              borderRadius: 20, fontSize: 10, fontWeight: 700,
              padding: "1px 6px", minWidth: 18, textAlign: "center",
            }}>
              {f === "all" ? taskCounts.all : f === "pending" ? taskCounts.pending : taskCounts.completed}
            </span>
          </button>
        ))}
      </div>
      {taskCounts.completed > 0 && (
        <button
          onClick={onClearCompleted}
          style={{
            background: "transparent", border: "0.5px solid #ddd", borderRadius: 9,
            padding: "6px 12px", fontSize: 12, color: "#888",
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
          }}
        >
          Clear done
        </button>
      )}
    </div>
  );
}