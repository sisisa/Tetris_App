import { useTetris } from "./hooks/useTetris"
import { Board } from "./components/Board"

export default function App() {
  const { board, piece, score, gameOver } = useTetris()

  return (
    <div style={{
      height: "100vh",
      width: "200vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      gap: 40
    }}>
      <Board board={board} piece={piece} />

      <div>
        <h2>Score</h2>
        <p>{score}</p>
        {gameOver && <h2>Game Over</h2>}
      </div>
    </div>
  )
}
