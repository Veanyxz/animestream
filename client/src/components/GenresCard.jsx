export default function GenresCard() {
  return (
    <div
      style={{
        position: "absolute",
        top: 1010,
        right: 30,
        background: "teal",
        height: "830px",
      }}
    >
      <div
        style={{
          alignItems: "center",
          justifyItems: "center",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          height: 370,
          width: 400,
          background: "#2a2c31",
          color: "red",
          display: "grid",
        }}
      >
        <a style={{ color: "red" }}>Action</a>
        <a style={{ color: "red" }}>Action</a>

        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>
        <a style={{}}>Action</a>

        <button style={{ justifySelf: "center", width: "90%" }}>
          Show More
        </button>
      </div>

      <br />
      <br />
      <div>
        <h2 style={{ color: "greenyellow" }}>Most Viewed</h2>
        <div style={{ display: "flex", gap: 5 }}>
          <span>Today</span>
          <span>Week</span>

          <span>Month</span>

          <span>All</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 5 }}>
        <h1>1</h1>
        <span>One piece</span>
      </div>
      <div style={{ display: "flex", gap: 5 }}>
        <h1>1</h1>
        <span>One piece</span>
      </div>
      <div style={{ display: "flex", gap: 5 }}>
        <h1>1</h1>
        <span>One piece</span>
      </div>

      <div style={{ display: "flex", gap: 5 }}>
        <h1>1</h1>
        <span>One piece</span>
      </div>
      <div style={{ display: "flex", gap: 5 }}>
        <h1>1</h1>
        <span>One piece</span>
      </div>

      <div style={{ display: "flex", gap: 5 }}>
        <h1>1</h1>
        <span>One piece</span>
      </div>
      <div style={{ display: "flex", gap: 5 }}>
        <h1>1</h1>
        <span>One piece</span>
      </div>
    </div>
  );
}
