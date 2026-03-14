import type { BoardType, Piece } from "../types/tetris"

export const Board = ({ board, piece }: { board: BoardType; piece: Piece }) => {
  const display = board.map((r) => [...r])

  piece.shape.forEach((row, y) =>
    row.forEach((v, x) => {
      if (v) display[piece.y + y][piece.x + x] = piece.color
    })
  )

  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(10, 30px)",
      gap: "1px",
      background: "rgba(255, 255, 255, 0.05)",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)"
    }}>
      {display.flat().map((c, i) => (
        <div key={i} style={{
          width: 30,
          height: 30,
          background: c ? c : "rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: c ? `inset 0 0 8px rgba(255, 255, 255, 0.3)` : "none",
          borderRadius: "2px"
        }} />
      ))}
    </div>
  )
}