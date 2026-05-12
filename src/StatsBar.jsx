export default function StatsBar({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "#888", fontFamily: "'DM Sans', sans-serif" }}>
        <span>{done} of {total} tasks done</span>
        <span style={{ fontWeight: 600, color: pct === 100 ? "#3B6D11" : "#888" }}>{pct}%</span>
      </div>
      <div style={{ height: 5, background: "#ebebeb", borderRadius: 10, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: pct === 100 ? "#639922" : "#534AB7",
          borderRadius: 10, transition: "width 0.4s ease, background 0.4s",
        }} />
      </div>
    </div>
  );
}