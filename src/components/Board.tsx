export const Board = ({ board, piece }: any) => {
  const display = board.map((r: number[]) => [...r])

  piece.shape.forEach((row: number[], y: number) =>
    row.forEach((v: number, x: number) => {
      if (v) display[piece.y + y][piece.x + x] = 1
    })
  )

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 24px)" }}>
      {display.flat().map((c: number, i: number) => (
        <div key={i} style={{
          width: 24,
          height: 24,
          background: c ? "#22c55e" : "#111",
          border: "1px solid #333"
        }} />
      ))}
    </div>
  )
}
