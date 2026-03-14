import { useTetris, Board, NextPiece } from "./features/tetris"

export default function App() {
  const { 
    board, 
    piece, 
    nextPiece, 
    score, 
    level, 
    gameOver, 
    gameStarted, 
    startGame 
  } = useTetris()

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: "20px",
      padding: "20px"
    }}>
      <h1 style={{ 
        margin: 0, 
        fontSize: "2.5rem", 
        background: "linear-gradient(to right, #00f0f0, #a000f0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: 900
      }}>
        TETRIS
      </h1>

      <div style={{
        display: "flex",
        gap: "30px",
        background: "rgba(255, 255, 255, 0.03)",
        padding: "30px",
        borderRadius: "20px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        position: "relative"
      }}>
        {/* Main Board */}
        <div style={{ position: "relative" }}>
          <Board board={board} piece={piece} />
          
          {(!gameStarted || gameOver) && (
            <div style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(4px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              zIndex: 10,
              gap: "20px"
            }}>
              {gameOver && <h2 style={{ color: "#ff4444", margin: 0 }}>GAME OVER</h2>}
              <button 
                onClick={startGame}
                style={{
                  background: "linear-gradient(135deg, #00f0f0, #0000f0)",
                  border: "none",
                  color: "white",
                  padding: "12px 30px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  cursor: "pointer",
                  boxShadow: "0 0 15px rgba(0, 240, 240, 0.4)",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)"
                  e.currentTarget.style.boxShadow = "0 0 25px rgba(0, 240, 240, 0.6)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)"
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 240, 240, 0.4)"
                }}
              >
                {gameOver ? "TRY AGAIN" : "START GAME"}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "160px"
        }}>
          <NextPiece pieceKey={nextPiece.key} />

          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center"
          }}>
            <p style={{ margin: 0, color: "#aaa", fontSize: "0.8rem", textTransform: "uppercase" }}>Score</p>
            <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}>{score}</p>
          </div>

          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center"
          }}>
            <p style={{ margin: 0, color: "#aaa", fontSize: "0.8rem", textTransform: "uppercase" }}>Level</p>
            <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}>{level}</p>
          </div>
        </div>
      </div>
      
      <div style={{ color: "#666", fontSize: "0.9rem", marginTop: "10px" }}>
        ARROW KEYS TO MOVE & ROTATE
      </div>
    </div>
  )
}
