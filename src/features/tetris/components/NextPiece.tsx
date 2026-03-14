import type { TetrominoKey } from "../utils/tetris-logic"
import { TETROMINOES } from "../utils/tetris-logic"

export const NextPiece = ({ pieceKey }: { pieceKey: TetrominoKey | null }) => {
  if (!pieceKey) return null
  
  const tetromino = TETROMINOES[pieceKey]
  const display = tetromino.shape

  return (
    <div style={{
      background: "rgba(255, 255, 255, 0.05)",
      padding: "15px",
      borderRadius: "8px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      minWidth: "100px"
    }}>
      <h3 style={{ margin: 0, fontSize: "14px", color: "#aaa", textTransform: "uppercase" }}>Next</h3>
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${display[0].length}, 20px)`,
        gap: "1px"
      }}>
        {display.flat().map((c, i) => (
          <div key={i} style={{
            width: 20,
            height: 20,
            background: c ? tetromino.color : "transparent",
            boxShadow: c ? `inset 0 0 5px rgba(255, 255, 255, 0.3)` : "none",
            borderRadius: "1px"
          }} />
        ))}
      </div>
    </div>
  )
}
